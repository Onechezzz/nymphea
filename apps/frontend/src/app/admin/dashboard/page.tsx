'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import Link from 'next/link';

interface Aroma {
  id: string;
  brand: string;
  gender: string;
  i18n: { uk?: { name: string }; en: { name: string } };
  tags: string[];
}

const genderLabel: Record<string, string> = { male: 'Male', female: 'Female', unisex: 'Unisex' };
const genderBadge: Record<string, string> = {
  male: 'admin-badge admin-badge-male',
  female: 'admin-badge admin-badge-female',
  unisex: 'admin-badge admin-badge-unisex',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [aromas, setAromas] = useState<Aroma[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    loadAromas();
  }, []);

  const checkAuth = async () => {
    try { await apiClient.getMe(); }
    catch { router.push('/admin'); }
  };

  const loadAromas = async () => {
    try {
      const data = await apiClient.getAromas({ search, gender: genderFilter || undefined });
      setAromas(data);
    } catch { }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this aroma?')) return;
    setDeleting(id);
    try {
      await apiClient.deleteAroma(id);
      setAromas(aromas.filter(a => a.id !== id));
    } catch { alert('Delete failed'); }
    finally { setDeleting(null); }
  };

  const handleExport = async () => {
    try {
      const blob = await apiClient.exportAromas();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `aromas-${Date.now()}.json`; a.click();
    } catch { alert('Export failed'); }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'application/json';
    input.onchange = async (e: any) => {
      const file = e.target.files[0]; if (!file) return;
      try {
        const text = await file.text();
        await apiClient.importAromas(JSON.parse(text));
        alert('Import successful!'); loadAromas();
      } catch { alert('Import failed'); }
    };
    input.click();
  };

  const aromaName = (a: Aroma) => a.i18n.en?.name || a.i18n.uk?.name || a.brand;

  return (
    <div className="admin-page">
      {/* Header */}
      <header style={{
        background: 'white', borderBottom: '1px solid #e2e8f0',
        padding: '0 24px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.3rem' }}>🌸</span>
          <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#1e293b' }}>
            AURA MYTHOS
          </span>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>/ Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/" style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'none' }}>
            ← Client App
          </Link>
          <button
            onClick={() => { apiClient.logout(); router.push('/admin'); }}
            style={{
              padding: '8px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0',
              borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem',
              color: '#374151', fontWeight: 500,
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main style={{ padding: '28px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Page title */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
            Aromas
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            {aromas.length} fragrance{aromas.length !== 1 ? 's' : ''} in database
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && loadAromas()}
            placeholder="Search by brand or name..."
            className="admin-input"
            style={{ flex: 1, minWidth: '200px', maxWidth: '300px' }}
          />
          <select
            value={genderFilter}
            onChange={e => setGenderFilter(e.target.value)}
            className="admin-input"
            style={{ width: '150px' }}
          >
            <option value="">All types</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
          <button
            onClick={loadAromas}
            style={{
              padding: '10px 18px', background: 'linear-gradient(135deg, #f17bab, #77a394)',
              border: 'none', borderRadius: '10px', color: 'white',
              cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem',
            }}
          >
            Search
          </button>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              href="/admin/aromas/new"
              style={{
                padding: '10px 18px', background: 'linear-gradient(135deg, #f17bab, #77a394)',
                borderRadius: '10px', color: 'white', textDecoration: 'none',
                fontWeight: 600, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '6px',
              }}
            >
              + New Aroma
            </Link>
            <button
              onClick={handleImport}
              style={{
                padding: '10px 18px', background: 'white', border: '1.5px solid #e2e8f0',
                borderRadius: '10px', cursor: 'pointer', fontSize: '0.88rem',
                color: '#374151', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              📥 Import
            </button>
            <button
              onClick={handleExport}
              style={{
                padding: '10px 18px', background: 'white', border: '1.5px solid #e2e8f0',
                borderRadius: '10px', cursor: 'pointer', fontSize: '0.88rem',
                color: '#374151', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              📤 Export
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>Loading...</div>
        ) : aromas.length === 0 ? (
          <div className="admin-card" style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            No aromas found
          </div>
        ) : (
          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  {['Name', 'Brand', 'Type', 'Tags', 'Actions'].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: 'left',
                      fontSize: '0.75rem', fontWeight: 700,
                      color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {aromas.map((aroma, i) => (
                  <tr
                    key={aroma.id}
                    style={{
                      borderBottom: i < aromas.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fafbff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                      {aromaName(aroma)}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '0.88rem' }}>
                      {aroma.brand}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className={genderBadge[aroma.gender] || 'admin-badge'}>
                        {genderLabel[aroma.gender] || aroma.gender}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {aroma.tags.slice(0, 3).map(tag => (
                          <span key={tag} style={{
                            background: '#f3f4f6', color: '#6b7280',
                            borderRadius: '6px', padding: '2px 8px', fontSize: '0.75rem',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link
                          href={`/admin/aromas/${aroma.id}`}
                          style={{
                            padding: '6px 14px', background: '#eff6ff', color: '#1d4ed8',
                            borderRadius: '8px', textDecoration: 'none',
                            fontSize: '0.82rem', fontWeight: 600,
                          }}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(aroma.id)}
                          disabled={deleting === aroma.id}
                          style={{
                            padding: '6px 14px', background: '#fef2f2', color: '#dc2626',
                            border: 'none', borderRadius: '8px', cursor: 'pointer',
                            fontSize: '0.82rem', fontWeight: 600,
                            opacity: deleting === aroma.id ? 0.5 : 1,
                          }}
                        >
                          {deleting === aroma.id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
