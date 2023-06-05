import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import SidebarButton from './sidebarButton';
import { TbMoodCog } from 'react-icons/tb';
import { MdFavorite } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import apiClient from '../../spotify';

export default function Sidebar({ onSignOut }) {
  const [image, setImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
  );

  useEffect(() => {
    apiClient.get("me").then(response => {
      setImage(response.data.images[0].url);
    });
  }, []);

  return (
    <div className='sidebar-container'>
        <img src={image} className='profile-img' alt='profile' />
        <div>
            <SidebarButton title="Mood" to="/mood" icon={<TbMoodCog />} />
            <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
            <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite />} />
            <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
        </div>
        <SidebarButton title="Sign Out" onClick={onSignOut} icon={<FaSignOutAlt />} />
    </div>
  );
}
