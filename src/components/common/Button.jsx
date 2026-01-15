import React from 'react';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  style = {},
  ...props
}) => {
  const baseStyle = {
    padding: '14px 40px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s',
    opacity: disabled || loading ? 0.7 : 1,
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    ...style,
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...baseStyle, ...variants[variant] }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
      {...props}
    >
      {loading ? '⏳ Processing...' : children}
    </button>
  );
};