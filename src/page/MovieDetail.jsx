import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Hls from 'hls.js'
import './MovieDetail.css'
import { motion } from 'framer-motion'

const MovieDetail = () => {
  const { slug } = useParams()
  const [movie, setMovie] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [videoUrl, setVideoUrl] = useState('')
  const [error, setError] = useState(null)
  const videoRef = useRef(null)
  const hlsRef = useRef(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 100

  // Fetch chi tiết phim
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`https://phimapi.com/phim/${slug}`)
        const data = await response.json()
        setMovie(data.movie)
        const eps = data.episodes?.[0]?.server_data || []
        setEpisodes(eps)
      } catch (err) {
        setError('Không thể tải thông tin phim')
      }
    }

    fetchDetail()
  }, [slug])

  // Xử lý phát tập phim
  const playEpisode = (link) => {
    setVideoUrl(link)
    // Scroll to video component smoothly
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Xử lý video với HLS.js
  useEffect(() => {
    if (!videoUrl || !videoRef.current) return

    const video = videoRef.current

    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }

    if (Hls.isSupported()) {
      const hls = new Hls()
      hlsRef.current = hls
      hls.loadSource(videoUrl)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => setError('Không thể tự động phát video'))
      })

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          setError('Lỗi khi phát video')
          hls.destroy()
        }
      })
    } else {
      video.src = videoUrl
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => setError('Không thể tự động phát video'))
      })
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [videoUrl])

  // Phân trang danh sách tập
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentEpisodes = episodes.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(episodes.length / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (!movie) return (
    <div className="movie-detail-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 style={{ color: 'var(--text-muted)' }}>Đang tải thông tin phim...</h2>
      </motion.div>
    </div>
  )

  return (
    <motion.div 
      className="movie-detail-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="movie-header-section">
        <motion.div 
          className="movie-poster-large"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img src={movie.poster_url} alt={movie.name} />
        </motion.div>

        <div className="movie-info-large">
          <motion.h1 
            className="movie-detail-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {movie.name} ({movie.year})
          </motion.h1>
          <motion.p 
            className="movie-detail-origin"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {movie.origin_name}
          </motion.p>

          <motion.div 
            className="movie-meta-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="meta-item">
              <span className="meta-label">Trạng thái</span>
              <span className="meta-value">{movie.status === 'ongoing' ? 'Đang chiếu' : 'Hoàn thành'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Tập hiện tại</span>
              <span className="meta-value">{movie.episode_current} / {movie.episode_total}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Thời lượng</span>
              <span className="meta-value">{movie.time || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Chất lượng</span>
              <span className="meta-value">{movie.quality} ({movie.lang})</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Thể loại</span>
              <span className="meta-value">{movie.category?.map(c => c.name).join(', ')}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Quốc gia</span>
              <span className="meta-value">{movie.country?.map(c => c.name).join(', ')}</span>
            </div>
            {movie.director && movie.director.length > 0 && movie.director[0] !== '' && (
              <div className="meta-item" style={{ gridColumn: '1 / -1' }}>
                <span className="meta-label">Đạo diễn</span>
                <span className="meta-value">{movie.director.join(', ')}</span>
              </div>
            )}
            {movie.actor && movie.actor.length > 0 && movie.actor[0] !== '' && (
              <div className="meta-item" style={{ gridColumn: '1 / -1' }}>
                <span className="meta-label">Diễn viên</span>
                <span className="meta-value">{movie.actor.join(', ')}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {movie.content && (
        <motion.div 
          className="movie-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2>Nội dung phim</h2>
          <div className="movie-description-content" dangerouslySetInnerHTML={{ __html: movie.content }} />
        </motion.div>
      )}

      {episodes.length > 0 && (
        <motion.div 
          className="episode-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2><span role="img" aria-label="tv">📺</span> Danh sách tập</h2>
          {error && <p className="error" style={{ marginBottom: '20px' }}>{error}</p>}
          
          <div className="episode-grid">
            {currentEpisodes.map((ep, index) => (
              <button
                key={index}
                onClick={() => playEpisode(ep.link_m3u8)}
                className={`episode-btn ${videoUrl === ep.link_m3u8 ? 'active' : ''}`}
              >
                {ep.name}
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination" style={{ marginTop: '30px' }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &laquo; Trước
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={currentPage === i + 1 ? 'active' : ''}
                  style={currentPage === i + 1 ? { background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' } : {}}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Sau &raquo;
              </button>
            </div>
          )}
        </motion.div>
      )}

      {videoUrl && (
        <motion.div 
          className="video-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <video
            ref={videoRef}
            className="video-player"
            controls
            autoPlay
          ></video>
        </motion.div>
      )}
    </motion.div>
  )
}

export default MovieDetail
