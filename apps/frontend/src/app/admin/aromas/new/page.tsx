'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { Gender } from '@aroma/shared-types';

export default function NewAromaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    brand: '',
    gender: Gender.UNISEX,
    intensity: { sillage: 0.5, longevity: 0.5 },
    facets: {
      freshness: 0.5,
      sweetness: 0.5,
      warmth: 0.5,
      woodiness: 0.5,
      florality: 0.5,
      spiciness: 0.5,
      clean_musk: 0.5,
      powdery: 0.5,
      green: 0.5,
      citrus: 0.5,
      ambery: 0.5,
    },
    vibe: {
      day_night: 0.5,
      formal_casual: 0.5,
      introvert_extrovert: 0.5,
      safe_provocative: 0.5,
    },
    tags: '',
    i18n: {
      uk: { name: '', shortDesc: '', style: '' },
      ru: { name: '', shortDesc: '', style: '' },
      en: { name: '', shortDesc: '', style: '' },
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };
      await apiClient.createAroma(data);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Помилка створення');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Створити аромат</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Basic info */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Базова інформація</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Бренд
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Тип
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                  className="input"
                >
                  <option value={Gender.MALE}>Чоловічий</option>
                  <option value={Gender.FEMALE}>Жіночий</option>
                  <option value={Gender.UNISEX}>Унісекс</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Теги (через кому)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="input"
                  placeholder="fresh, elegant, woody"
                />
              </div>
            </div>
          </div>

          {/* i18n */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Переклади</h2>
            
            {(['uk', 'ru', 'en'] as const).map((lang) => (
              <div key={lang} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">{lang.toUpperCase()}</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Назва"
                    value={formData.i18n[lang].name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        i18n: {
                          ...formData.i18n,
                          [lang]: { ...formData.i18n[lang], name: e.target.value },
                        },
                      })
                    }
                    className="input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Короткий опис"
                    value={formData.i18n[lang].shortDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        i18n: {
                          ...formData.i18n,
                          [lang]: { ...formData.i18n[lang], shortDesc: e.target.value },
                        },
                      })
                    }
                    className="input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Стиль"
                    value={formData.i18n[lang].style}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        i18n: {
                          ...formData.i18n,
                          [lang]: { ...formData.i18n[lang], style: e.target.value },
                        },
                      })
                    }
                    className="input"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Facets */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Facets (0-1)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.keys(formData.facets).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key}: {formData.facets[key as keyof typeof formData.facets].toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={formData.facets[key as keyof typeof formData.facets]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        facets: { ...formData.facets, [key]: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Vibe */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Vibe (0-1)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.keys(formData.vibe).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key}: {formData.vibe[key as keyof typeof formData.vibe].toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={formData.vibe[key as keyof typeof formData.vibe]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vibe: { ...formData.vibe, [key]: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Intensity (0-1)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.keys(formData.intensity).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key}: {formData.intensity[key as keyof typeof formData.intensity].toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={formData.intensity[key as keyof typeof formData.intensity]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        intensity: { ...formData.intensity, [key]: parseFloat(e.target.value) },
                      })
                    }
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? 'Створення...' : 'Створити'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Скасувати
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
