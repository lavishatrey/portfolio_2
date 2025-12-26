import React, { useEffect, useState } from 'react';

type NoteLink = {
  id: string;
  title: string;
  url: string;
  createdAt: string;
};

type UploadedFile = {
  id: string;
  name: string;
  type?: string;
  size: number;
  dataUrl?: string; // base64 data URL (local storage)
  url?: string; // remote URL (server)
  createdAt: string;
};

const LINKS_KEY = 'mynotes_links_v1';
const FILES_KEY = 'mynotes_files_v1';

const isValidUrl = (value: string) => {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:' || u.protocol === 'mailto:';
  } catch (e) {
    return false;
  }
};

const MyNotes: React.FC = () => {
  const [links, setLinks] = useState<NoteLink[]>([]);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const API = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    // If API configured, prefer server-stored data. Otherwise fallback to localStorage
    if (API) {
      // fetch links and files from server
      fetch(`${API}/links`)
        .then((r) => r.json())
        .then((data) => setLinks(data || []))
        .catch(() => {
          const rawLinks = localStorage.getItem(LINKS_KEY);
          if (rawLinks) setLinks(JSON.parse(rawLinks));
        });

      fetch(`${API}/files`)
        .then((r) => r.json())
        .then((data) => setFiles(data || []))
        .catch(() => {
          const rawFiles = localStorage.getItem(FILES_KEY);
          if (rawFiles) setFiles(JSON.parse(rawFiles));
        });
    } else {
      const rawLinks = localStorage.getItem(LINKS_KEY);
      const rawFiles = localStorage.getItem(FILES_KEY);
      if (rawLinks) setLinks(JSON.parse(rawLinks));
      if (rawFiles) setFiles(JSON.parse(rawFiles));
    }
  }, []);

  useEffect(() => {
    if (!API) localStorage.setItem(LINKS_KEY, JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    if (!API) localStorage.setItem(FILES_KEY, JSON.stringify(files));
  }, [files]);

  const addLink = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !url.trim()) {
      setError('Please provide both title and URL.');
      return;
    }
    if (!isValidUrl(url.trim())) {
      setError('Please provide a valid URL (http(s) or mailto).');
      return;
    }
    const newLink: NoteLink = {
      id: Date.now().toString(),
      title: title.trim(),
      url: url.trim(),
      createdAt: new Date().toISOString(),
    };

    if (API) {
      fetch(`${API}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newLink.title, url: newLink.url }),
      })
        .then((r) => r.json())
        .then((created) => {
          setLinks((s) => [created, ...s]);
          setTitle('');
          setUrl('');
        })
        .catch(() => {
          // fallback
          setLinks((s) => [newLink, ...s]);
          setTitle('');
          setUrl('');
        });
    } else {
      setLinks((s) => [newLink, ...s]);
      setTitle('');
      setUrl('');
    }
  };

  const removeLink = (id: string) => {
    if (API) {
      fetch(`${API}/links/${id}`, { method: 'DELETE' }).then(() => setLinks((s) => s.filter((l) => l.id !== id)));
    } else {
      setLinks((s) => s.filter((l) => l.id !== id));
    }
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return;
    const arr = Array.from(fileList);
    if (API) {
      const form = new FormData();
      arr.forEach((f) => form.append('files', f));
      try {
        const res = await fetch(`${API}/upload`, { method: 'POST', body: form });
        const created = await res.json();
        // server returns array of file metadata with url
        setFiles((s) => [...created, ...s]);
      } catch (e) {
        // fallback to local
        const converted: UploadedFile[] = await Promise.all(
          arr.map(async (f) => {
            const dataUrl = await fileToDataUrl(f);
            return {
              id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
              name: f.name,
              type: f.type,
              size: f.size,
              dataUrl,
              createdAt: new Date().toISOString(),
            };
          })
        );
        setFiles((s) => [...converted, ...s]);
      }
    } else {
      const converted: UploadedFile[] = await Promise.all(
        arr.map(async (f) => {
          const dataUrl = await fileToDataUrl(f);
          return {
            id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
            name: f.name,
            type: f.type,
            size: f.size,
            dataUrl,
            createdAt: new Date().toISOString(),
          };
        })
      );
      // prepend
      setFiles((s) => [...converted, ...s]);
    }
  };

  const fileToDataUrl = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (id: string) => {
    if (API) {
      fetch(`${API}/files/${id}`, { method: 'DELETE' }).then(() => setFiles((s) => s.filter((f) => f.id !== id)));
    } else {
      setFiles((s) => s.filter((f) => f.id !== id));
    }
  };

  const downloadFile = (f: UploadedFile) => {
    // If file has remote URL, open that. Otherwise reconstruct from dataUrl
    if (f.url) {
      const a = document.createElement('a');
      a.href = f.url;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }
    if (!f.dataUrl) return;
    const parts = f.dataUrl.split(',');
    const meta = parts[0];
    const base64 = parts[1];
    const mimeMatch = meta.match(/data:([^;]+);/);
    const mime = mimeMatch ? mimeMatch[1] : f.type || 'application/octet-stream';
    const byteChars = atob(base64);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = f.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-28 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">My Notes</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add a note link</h2>
        <form onSubmit={addLink} className="space-y-2">
          <div className="flex flex-col md:flex-row md:space-x-2">
            <input
              className="flex-1 border rounded px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
              placeholder="Title (e.g. React Hooks cheatsheet)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="flex-1 border rounded px-3 py-2 mt-2 md:mt-0 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
              placeholder="URL (https://...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 md:mt-0 md:ml-2 hover:bg-blue-700 transition-colors">
              Add
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Upload notes from your computer</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Files are saved in your browser (localStorage) or to the configured server. Large files may increase storage use.</p>
        <input
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="mb-4 text-gray-700 dark:text-gray-200"
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Saved links</h2>
        {links.length === 0 && <p className="text-gray-600 dark:text-gray-300">No saved links yet.</p>}
        <ul className="space-y-2">
          {links.map((l) => (
            <li key={l.id} className="flex items-center justify-between border rounded p-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
              <div>
                <a href={l.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {l.title}
                </a>
                <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(l.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center space-x-2">
                <a href={l.url} target="_blank" rel="noreferrer" className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">Open</a>
                <button onClick={() => removeLink(l.id)} className="text-sm text-red-600 dark:text-red-400">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Uploaded files</h2>
        {files.length === 0 && <p className="text-gray-600 dark:text-gray-300">No uploaded files yet.</p>}
        <ul className="space-y-2">
          {files.map((f) => (
            <li key={f.id} className="flex items-center justify-between border rounded p-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
              <div>
                <div className="font-medium">{f.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{(f.size / 1024).toFixed(2)} KB • {new Date(f.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => downloadFile(f)} className="text-sm text-blue-600 hover:text-blue-700 dark:hover:text-blue-400">Download</button>
                <button onClick={() => removeFile(f.id)} className="text-sm text-red-600 dark:text-red-400">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default MyNotes;
