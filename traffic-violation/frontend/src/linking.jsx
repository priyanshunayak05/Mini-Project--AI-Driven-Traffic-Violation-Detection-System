import { useEffect, useState } from 'react'
import './App.css'
import Page from './components/page_1'
import Features from './left/features'
import Top from './right/top';
import { FaTimes, FaVideo } from 'react-icons/fa';
import Upload from './components/upload';
import Setting from './components/setting';

function Linking() {
  const [activeFeature, setActiveFeature] = useState({name: "Live Streaming", icon: <FaVideo />});
  const [ngrok_url, setNgrok_url] = useState('http://localhost:5000');

  return (
	<div className='h-screen sm:h-screen w-full'>
	  <div className='h-full w-full flex flex-row'>
		<div className="h-full w-fit">
		  <Features 
		  setActiveFeature={setActiveFeature}
		  activeFeature={activeFeature}
		  />
		</div>
		<div className='h-full w-full flex flex-col overflow-auto'>
		  <div className='sticky z-20 top-0 bg-white'>
			<Top activeFeature={activeFeature}/>
		  </div>
		  {activeFeature?.name === 'Live Streaming' ?
			<Page
			 ngrok_url={ngrok_url}
			/>
			:
			activeFeature?.name === "Upload File" ?
			<Upload 
			 ngrok_url={ngrok_url}
			/>
			:
			activeFeature?.name === "Settings" ?
			<Setting ngrok_url={ngrok_url} setNgrok_url={setNgrok_url}/>
			:
			<div className='h-full w-full items-center flex justify-center bg-zinc-200'>
			  <div className='flex flex-col gap-4 items-center'>
				<div className='w-fit h-fit p-4 border-2 rounded-full border-t-transparent animate-spin'></div>
				<p>{activeFeature?.name}...</p>
			  </div>
			</div>
		  }
		</div>
	  </div>
	</div>
  )
}

export default Linking;
