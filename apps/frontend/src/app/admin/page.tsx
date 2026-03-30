"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiClient.login(email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #f17bab, #77a394)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              margin: "0 auto 16px",
              boxShadow: "0 8px 24px rgba(241,123,171,0.3)",
            }}
          >
            🌸
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>Admin Panel</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Sign in to manage the system</p>
        </div>

        {/* Form */}
        <div className="admin-card">
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {error && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#dc2626",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "0.88rem",
                }}
              >
                {error}
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                placeholder="admin@aroma.com"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",
                background: loading ? "#f9c8e0" : "linear-gradient(135deg, #f17bab, #77a394)",
                border: "none",
                borderRadius: "10px",
                color: "white",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px rgba(241,123,171,0.3)",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* <div style={{
            marginTop: '20px', padding: '14px 16px',
            background: '#f8fafc', borderRadius: '10px',
            border: '1px solid #e2e8f0',
          }}>
            <p style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>
              Test credentials:
            </p>
            <p style={{ fontSize: '0.82rem', color: '#475569' }}>admin@aroma.com / admin123</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
