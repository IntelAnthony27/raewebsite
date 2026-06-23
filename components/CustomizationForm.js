'use client'

import { useState } from 'react'

/**
 * CustomizationForm — reusable product customization workflow
 * Props:
 *   customOptions  — from product.customOptions
 *   onChange(vals) — callback with current option values
 *   values         — controlled values object
 */
export default function CustomizationForm({ customOptions, values = {}, onChange }) {
  if (!customOptions) return null

  const handleChange = (key, val) => {
    onChange({ ...values, [key]: val })
  }

  return (
    <div
      style={{
        background: 'var(--cream)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        border: '1.5px solid var(--cream-dark)',
      }}
      aria-label="Customization options"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
        <span style={{ fontSize: '1.1rem' }}>✏️</span>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--ink)' }}>
          Make it yours
        </p>
      </div>

      {Object.entries(customOptions).map(([key, opt]) => (
        <div key={key} className="form-group">
          <label className="label" htmlFor={`custom-${key}`}>{opt.label}</label>

          {opt.type === 'text' && (
            <input
              id={`custom-${key}`}
              type="text"
              className="input"
              placeholder={opt.placeholder}
              maxLength={opt.maxLength}
              value={values[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              aria-label={opt.label}
            />
          )}

          {opt.type === 'textarea' && (
            <textarea
              id={`custom-${key}`}
              className="input"
              placeholder={opt.placeholder}
              maxLength={opt.maxLength}
              value={values[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              style={{ minHeight: '100px' }}
              aria-label={opt.label}
            />
          )}

          {opt.type === 'swatch' && (
            <div className="swatch-group" role="group" aria-label={opt.label}>
              {opt.options.map((sw) => (
                <button
                  key={sw.id}
                  id={`swatch-${key}-${sw.id}`}
                  className={`swatch ${values[key] === sw.id ? 'selected' : ''}`}
                  style={{ background: sw.hex }}
                  onClick={() => handleChange(key, sw.id)}
                  title={sw.label}
                  aria-label={`${sw.label} ${values[key] === sw.id ? '(selected)' : ''}`}
                  aria-pressed={values[key] === sw.id}
                  type="button"
                />
              ))}
            </div>
          )}

          {opt.type === 'select' && (
            <select
              id={`custom-${key}`}
              className="input"
              value={values[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              aria-label={opt.label}
            >
              <option value="">Select an option</option>
              {opt.options.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          )}

          {/* Character count for text/textarea */}
          {(opt.type === 'text' || opt.type === 'textarea') && opt.maxLength && (
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', textAlign: 'right' }}>
              {(values[key] || '').length}/{opt.maxLength}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
