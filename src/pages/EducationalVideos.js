// src/pages/EducationalResources.js
import React, { useState, useEffect } from 'react';
import './EducationalVideos.css';

const EducationalResources = () => {
  const [activeTab, setActiveTab] = useState('guides');
  const [searchQuery, setSearchQuery] = useState('');
  const [failedVideos, setFailedVideos] = useState([]);

  // Sample resource data with proper YouTube embed URLs
  const resources = {
    guides: [
      {
        id: 1,
        title: "Organic Farming Best Practices",
        description: "A comprehensive guide to transitioning to organic farming methods, covering soil health, pest control, and sustainable practices.",
        type: "PDF Guide",
        level: "Beginner",
        length: "15 min read",
        downloadUrl: "https://www.fibl.org/fileadmin/documents/shop/1141-organic-farming-principles.pdf"
      }
    ],
    videos: [
      {
        id: 1,
        title: "Soil Health Fundamentals",
        description: "Learn how to test and improve your soil quality",
        type: "Video Tutorial",
        length: "12:34",
        level: "Beginner",
        videoId: "X6IiaGr-qvA",
        embedUrl: "https://www.youtube.com/embed/X6IiaGr-qvA"
      },
      {
        id: 2,
        title: "Pest Management Techniques",
        description: "Effective organic pest control methods",
        type: "Video Tutorial",
        length: "18:45",
        level: "Intermediate",
        videoId: "CELaZ62mkfY",
        embedUrl: "https://www.youtube.com/embed/CELaZ62mkfY"
      }
    ],
    courses: [
      {
        id: 1,
        title: "Sustainable Agriculture Certification",
        description: "6-week online course with expert instructors",
        type: "Online Course",
        length: "6 weeks",
        level: "Advanced",
        link: "https://www.edx.org/course/sustainable-agriculture"
      }
    ]
  };

  useEffect(() => {
    // Reset failed videos when tab changes
    setFailedVideos([]);
  }, [activeTab]);

  const filteredResources = resources[activeTab].filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVideoError = (videoId) => {
    if (!failedVideos.includes(videoId)) {
      setFailedVideos([...failedVideos, videoId]);
    }
  };

  return (
    <div className="educational-page">
      <h1>Educational Resources</h1>
      <p className="subtitle">Learn sustainable farming techniques and best practices</p>
      
      <div className="resources-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>
        
        <div className="resource-tabs">
          <button 
            className={activeTab === 'guides' ? 'active' : ''}
            onClick={() => setActiveTab('guides')}
          >
            Guides
          </button>
          <button 
            className={activeTab === 'videos' ? 'active' : ''}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
          <button 
            className={activeTab === 'courses' ? 'active' : ''}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
        </div>

        <div className="resources-grid">
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <div className="resource-card" key={resource.id}>
                <div className="resource-header">
                  <span className={`resource-type ${resource.type.toLowerCase().includes('video') ? 'video' : 
                                   resource.type.toLowerCase().includes('pdf') ? 'pdf' : ''}`}>
                    {resource.type}
                  </span>
                  <span className="resource-level">{resource.level}</span>
                </div>
                
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                
                {/* Content Section */}
                {resource.embedUrl ? (
                  <div className="video-embed-container">
                    {failedVideos.includes(resource.videoId) ? (
                      <div className="video-error">
                        <i className="fas fa-exclamation-triangle"></i>
                        <p>Video unavailable. <a href={`https://youtube.com/watch?v=${resource.videoId}`} target="_blank" rel="noopener noreferrer">Try watching on YouTube</a></p>
                      </div>
                    ) : (
                      <iframe
                        src={resource.embedUrl}
                        title={resource.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onError={() => handleVideoError(resource.videoId)}
                      ></iframe>
                    )}
                  </div>
                ) : resource.downloadUrl ? (
                  <div className="pdf-preview">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                ) : null}
                
                <div className="resource-footer">
                  <span className="resource-length">
                    <i className="far fa-clock"></i> {resource.length}
                  </span>
                  {resource.link ? (
                    <a href={resource.link} className="resource-link" target="_blank" rel="noopener noreferrer">
                      View Resource <i className="fas fa-arrow-right"></i>
                    </a>
                  ) : resource.downloadUrl ? (
                    <a 
                      href={resource.downloadUrl} 
                      className="resource-link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View PDF <i className="fas fa-external-link-alt"></i>
                    </a>
                  ) : (
                    <a 
                      href={`https://youtube.com/watch?v=${resource.videoId}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="resource-link"
                    >
                      Watch on YouTube <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <p>No resources found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationalResources;