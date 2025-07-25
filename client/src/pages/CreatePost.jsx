import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import {getRandomPrompts} from '../utils'
import { FormField, Loader } from '../components';


const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const generateImage = async () => {
    if(form.prompt){
      try{
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({prompt: form.prompt}),
           })
          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Failed request: ${response.status} ${errText}`);
          }
          const data = await response.json();

          setform({ ...form, photo : `data:image/png;base64,${data.photo}`})
        
      }catch(error){
        alert(error);
      }finally{
        setGeneratingImg(false);
      }
    }else{
      alert('Pleaase enter a prompt')
    }
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.prompt && form.photo) {
    setLoading(true);
    try {
      console.log("Submitting form:", form); // 🔍 Debug
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      console.log("Submission response:", result); // 🔍 Debug

      if (response.ok) {
        navigate('/');
      } else {
        alert('Failed to create post: ' + result.message);
      }
    } catch (err) {
      console.error('Error during submission:', err);
      alert('Submission error: ' + err.message);
    } finally {
      setLoading(false);
    }
  } else {
    alert('Please enter a prompt and generate image');
  }
};
  const handleChange = (e) =>{
    setform({ ...form, [e.target.name]: e.target.value})
  }
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompts(form.prompt);
    setform({...form, prompt: randomPrompt})
  }
  return (
    <section className='max-w-7xl mx-auto'>
       <div>
            <h1 className='font-extrabold text-[#222328] text-[32px]'>
                Create
            </h1>
            <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>
                Create imaginative and visually stunning images through DALL-E AI and share it with community
            </p>
        </div>

        <form className='mt-16 max-w-3xl ' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <FormField 
              LabelName = "Your name"
              type = "text"
              name = "name"
              placeholder = "John Doe"
              value = {form.name}
              handleChange = {handleChange}
            />
            <FormField 
              LabelName = "Prompt"
              type = "text"
              name = "prompt"
              placeholder = "teddy bears shopping for groceries in Japan, ukiyo-e"
              value = {form.prompt}
              handleChange = {handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className='relative bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
              {form.photo ? (
                <img
                  src = {form.photo}
                  alt={form.prompt}
                  className='w-full h-full object-contain'
                />
              ):(
               <img src={preview}
                alt= "preview"
                className='w-9/12 h-9/12 object-contain opacity-40'
                />
              )}
              {generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                  <Loader/>
                </div>
              )}
            </div>
          </div>
          <div className='mt-5 flex gap-5'>
              <button
              type="button"
                onClick={generateImage}
                className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                >

                  {generatingImg ? 'Generating...' : 'Generate'}
              </button>
          </div>
          <div className='mt-10'>
            <p className='mt-2 text-[#666e75] text-[14px]'>
              Once you have created the image you want, you can share it with others in the community
            </p>
            <button type='submit' className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'> 
              {loading ? 'Sharing...' : 'Share with the community'}
            </button>

          </div>
        </form>

    </section>
  )
}

export default CreatePost
