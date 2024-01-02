import { useRef } from 'react'
import { useNavigate,Form } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()
    const formRef = useRef<HTMLFormElement>(null)

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.stopPropagation()
        e.preventDefault()
        if(formRef.current){
            const formData = new FormData(formRef.current)
            const category = formData.get('category')
            if(category){
                navigate(`/quiz?category=${category}`)
            }
            else console.log('chose a category!')
        }
    }

    return (
        <div className='main--container home--container'>
            <Form method='post' action='*' className='home-form--container' ref={formRef} onSubmit={handleSubmit}>
                <label htmlFor='username'><h1>Username</h1></label>
                <input 
                    id='username'
                    name='username'
                    type='text'
                    placeholder='Enter your username'
                    required={true}
                ></input>
                <label htmlFor='category'><h1>Category</h1></label>
                <select 
                    id='category'
                    name="category"
                    className="form--input" 
                    defaultValue='default'
                    required={true}
                >
                    <option value='default' disabled>Select a category</option>
                    <option value="9">General Knowledge</option>{/*9*/}
                    <option value="15">Video Games</option> {/*15*/}
                    <option value="31">Anime & Manga</option> {/*31*/}
                    <option value="21">Sports</option> {/*21*/}
                    <option value="22">Geography</option> {/*22*/}
                    <option value="23">History</option> {/*23*/}
                    <option value="24">Politics</option> {/*24*/}
                </select>
                <button type='submit'>Start</button>
            </Form>
        </div>
    )
}
