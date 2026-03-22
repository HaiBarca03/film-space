import React, { useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Header = ({
  onSearch,
  onFilter,
  onFilterType,
  onLogoClick
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!searchTerm.trim()) return
    onSearch(searchTerm)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleFilterClick = (type) => {
    onFilter(type)
  }

  const handleFilterTypeClick = (type) => {
    onFilterType(type)
  }

  const categories = [
    { id: 'hanh-dong', name: 'Hành Động' },
    { id: 'co-trang', name: 'Cổ Trang' },
    { id: 'chien-tranh', name: 'Chiến Tranh' },
    { id: 'vien-tuong', name: 'Viễn Tưởng' },
    { id: 'kinh-di', name: 'Kinh Dị' },
    { id: 'tai-lieu', name: 'Tài Liệu' },
    { id: 'bi-an', name: 'Bí Ẩn' },
    { id: 'phim-18', name: 'Phim 18+' },
    { id: 'tinh-cam', name: 'Tình Cảm' },
    { id: 'tam-ly', name: 'Tâm Lý' },
    { id: 'the-thao', name: 'Thể Thao' },
    { id: 'phieu-luu', name: 'Phiêu Lưu' },
    { id: 'am-nhac', name: 'Âm Nhạc' },
    { id: 'gia-dinh', name: 'Gia Đình' },
    { id: 'hoc-duong', name: 'Học Đường' },
    { id: 'hai-huoc', name: 'Hài Hước' },
    { id: 'hinh-su', name: 'Hình Sự' },
    { id: 'vo-thuat', name: 'Võ Thuật' },
    { id: 'khoa-hoc', name: 'Khoa Học' },
    { id: 'than-thoai', name: 'Thần Thoại' },
    { id: 'chinh-kich', name: 'Chính kịch' },
    { id: 'kinh-dien', name: 'Kinh Điển' },
  ]

  return (
    <motion.header
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
    >
      <div
        className="logo"
        onClick={() => {
          navigate('/')
          onLogoClick()
        }}
      >
        <motion.span
          role="img"
          aria-label="movie"
          whileHover={{ rotate: 15, scale: 1.2 }}
        >
          🎥
        </motion.span> FilmSpace
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Tìm phim bạn yêu thích..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      <nav className="filter-nav">
        <button onClick={() => handleFilterClick('phim-bo')}>Phim Bộ</button>
        <button onClick={() => handleFilterClick('phim-le')}>Phim Lẻ</button>
        <button onClick={() => handleFilterClick('hoat-hinh')}>
          Hoạt Hình
        </button>

        <div className="dropdown">
          <button className="dropbtn">
            Thể Loại
            <svg style={{ marginLeft: '4px', display: 'inline', verticalAlign: 'middle' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div className="dropdown-content">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => handleFilterTypeClick(cat.id)}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
