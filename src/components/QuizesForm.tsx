import React, { useEffect, forwardRef,useRef, useState } from 'react'
import { Form, useAsyncValue, useNavigate } from 'react-router-dom'
import Quiz from './Quiz'

interface QuizData {
    category: string
    correct_answer: string
    difficulty: 'easy' | 'medium' | 'hard'
    incorrect_answers:  [string,string,string]
    question: string
    choices: {
        value: string;
        isCorrect: boolean;
        }[]
    type: 'multiple'
}

interface ResolvedPromise {
    response_code: number
    results: QuizData[] | undefined
}

interface QuizFormProps {
    isActive: boolean,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
}


const QuizesForm = forwardRef<HTMLFormElement, QuizFormProps>(({ isActive,setIsActive }, ref) => {
    const resolvedDataPromise = useAsyncValue() as ResolvedPromise
    const preQuizesData = resolvedDataPromise.results
    const [quizesData,setQuizesData] = useState<QuizData[] | undefined>(undefined)
    const navigate = useNavigate()

    useEffect(()=>{
        const quizesdata = preQuizesData?.map((quiz)=>{
            const choices = [quiz.correct_answer,...quiz.incorrect_answers.slice(0,2)].sort(() => 0.5 - Math.random()).map(choice=>{
                return {
                    value:choice,
                    isCorrect:quiz.correct_answer === choice
                  }
            })
            return {...quiz,choices:choices}
        })
        setQuizesData(quizesdata)
    },[preQuizesData])

    const quizEls = quizesData?.map((quiz,index)=>{
        [quiz.correct_answer,...quiz.incorrect_answers.slice(0,2)]

        return (
            <Quiz
                key={index}
                id={index + 1}
                question={quiz.question}
                choices={quiz.choices}
                isActive={isActive}
            />
        )
    })




    function handleSubmit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.stopPropagation()
        setIsActive(!isActive)
        window.scrollTo(0, 0);
        return false
    }

    return (
        <Form method='post' action='/quiz' ref={ref} className={`quizes--container`} onSubmit={handleSubmit}>
            {quizEls}
            {
                isActive?<button type='submit'>Submit</button>:
                <button onClick={() => navigate('/')}>Try again</button>
            }

        </Form>
  )
})

export default QuizesForm