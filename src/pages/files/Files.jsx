import React from 'react'
import AppLayout from '../../layouts/AppLayout';
import Button from '../../components/common/Button/Button';
import FileCard from './FileCard/FileCard';
import "./Files.css"
const Files = () => {
  const files = [
    {
      name: "photo.jpg",
      size: "2.1 MB",
    },
    {
      name: "resume.pdf",
      size: "350 KB",
    },
    {
      name: "project.zip",
      size: "15 MB",
    },
    {
      name: "notes.docx",
      size: "120 KB",
    },
  ];
  return (
    <AppLayout>
      <div className='files-page'>
        <div className='files-header'>
          <h1>Files</h1>
          <Button>
            Upload Files
          </Button>
        </div>

        <div className='files-list'>
          {files.map((file) => (
            <FileCard
              key={file.name}
              fileName={file.name}
              fileSize={file.size}
            />
          ))}

        </div>
      </div>
    </AppLayout>
  )
}

export default Files;