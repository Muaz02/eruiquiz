import { Await, defer, useLoaderData } from "react-router-dom";
import { ActionFunctionArgs, useActionData } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import QuizesForm from "../components/QuizesForm";
import Loading from "./Loading";

interface DataPromise {
    quizzes: Promise<Response>
}

export async function loader({ request } : ActionFunctionArgs){
    const category = (new URL(request.url).searchParams.get('category'))
    return defer({
        quizzes:fetch(`https://opentdb.com/api.php?amount=10&category=${category?category:'9'}&difficulty=hard&type=multiple`).then(res=>res.json())
    }) 
}

export async function action({ request } : ActionFunctionArgs){
    const formData = await request.formData()
    if(formData){
        let score = 0
        formData.forEach((input:FormDataEntryValue)=>{
            if(input === 'true'){
                score ++
              }
        })
        return score
    }
    else return null
}

const QuizGame:React.FC = () => {
    const dataPromise = useLoaderData() as DataPromise
    const score = useActionData() as number| null
    const formRef = useRef<HTMLFormElement>(null)
    const [isActive,setIsActive] = useState(true)
    const [time,setTime] = useState<number>(100)

    function handleTimeOut(){
        if(isActive && time > 0){
            setTimeout(()=>setTime(time - 1),1000)
        }
        if (time === 0){
            formRef.current?.requestSubmit()
        }
    }

    useEffect(()=>{
        handleTimeOut()
    },[time])

    return(
            <React.Suspense fallback={<Loading />}>
                    <Await resolve={dataPromise.quizzes}>
                        <div className="main--container quiz-game--container">
                            <div className="quiz-game--top">
                                <div className="score--container">
                                    <h1>Score:</h1>
                                    <span>{isActive?'-':`${score}/10`}</span>
                                </div>
                                <div className="time--container">
                                    <h1>{time}</h1>
                                </div>
                            </div>
                            <QuizesForm isActive={isActive} setIsActive={setIsActive} ref={formRef}/>
                        </div>
                    </Await>
            </React.Suspense>
    )
}

export default QuizGame