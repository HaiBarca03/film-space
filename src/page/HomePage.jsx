import React from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HomePage = ({
  movies,
  isLoading,
  error,
  isSearching,
  onReset,
  currentPage,
  hasMore,
  onNextPage,
  onPrevPage
}) => {
  const navigate = useNavigate()

  const handleClearSearch = () => {
    onReset()
  }

  // Animation variants cho grid
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 260, 
        damping: 20 
      } 
    }
  }

  return (
    <div className="home-container">
      <motion.h1 
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {isSearching ? '🔍 Kết quả tìm kiếm' : '🎬 Phim Mới Cập Nhật'}
      </motion.h1>

      {isLoading && (
        <motion.div 
          className="loading" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          <p style={{ marginTop: '20px', fontWeight: 500 }}>Đang tải thế giới phim...</p>
        </motion.div>
      )}
      
      {error && (
        <motion.p 
          className="error" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
        >
          {error}
        </motion.p>
      )}

      {!isLoading && !error && movies.length > 0 && (
        <motion.div 
          className="movie-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {movies.map((movie) => (
            <motion.div
              key={movie._id}
              variants={itemVariants}
              onClick={() => navigate(`/phim/${movie.slug}`)}
              className="movie-card"
              whileHover={{ y: -8 }}
            >
              <div className="movie-thumbnail-wrapper">
                <img
                  src={
                    movie.thumb_url?.startsWith('http')
                      ? movie.thumb_url
                      : `https://phimimg.com/${movie.thumb_url}`
                  }
                  alt={movie.name}
                  className="movie-thumbnail"
                  loading="lazy"
                />
                <div className="movie-badges">
                  {movie.episode_current && (
                    <span className="badge hot">{movie.episode_current}</span>
                  )}
                  {movie.quality && (
                    <span className="badge">{movie.quality}</span>
                  )}
                </div>
              </div>
              
              <div className="movie-info">
                <h3 className="movie-name" title={movie.name}>{movie.name}</h3>
                <p className="movie-origin-name" title={movie.origin_name}>{movie.origin_name || 'Đang cập nhật'}</p>
                
                <div className="movie-meta">
                  <span className="movie-year">
                    <svg style={{ verticalAlign: 'text-bottom', marginRight: '4px', color: 'var(--text-main)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {movie.year || 'N/A'}
                  </span>
                  <span className="movie-type">
                    {movie.type === 'hoathinh' ? 'Phim Bộ' : 'Phim Lẻ'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {movies.length === 0 && !isLoading && !error && (
        <motion.div 
          className="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Không tìm thấy bộ phim nào phù hợp với yêu cầu của bạn.
        </motion.div>
      )}

      <div className="pagination-container">
        {isSearching && (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearSearch} 
            className="clear-button"
          >
            ❌ Xóa tìm kiếm
          </motion.button>
        )}
        <motion.div 
          className="pagination"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button onClick={onPrevPage} disabled={currentPage === 1}>
            « Trang trước
          </button>
          <span>Trang {currentPage}</span>
          <button onClick={onNextPage} disabled={!hasMore}>
            Trang sau »
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage
