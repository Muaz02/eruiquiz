export interface QuizProps {
    isActive: boolean
    id: number
    question: string
    choices: {
        value: string;
        isCorrect: boolean;
    }[]
}

export default function Quiz(props:QuizProps){

    return(
        <div className="quiz--container">
            <div className="quiz--top">
                <div className="quiz--top-Q">
                    <h1>Q/{props.id}</h1>
                    <svg className="questionmark--icon" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.25328 0.372915C4.62119 0.389305 3.21021 1.74528 3.17217 3.33464L3.16688 3.57026C3.13796 4.78055 3.919 5.81493 5.15738 6.20577C5.47116 6.3048 5.80469 6.35968 6.14954 6.36978C6.20357 6.37139 6.25799 6.37434 6.31149 6.37863C6.40084 6.3857 6.27907 6.52687 6.03139 6.67828C5.86089 6.78253 5.69887 6.87768 5.57966 6.94773C3.82496 7.93923 2.70134 9.24815 2.24481 10.8237L2.15781 11.0997C2.10926 11.2543 2.08162 11.4085 2.07412 11.5609C2.06226 11.8197 1.63325 12.2962 1.20017 12.789C0.878021 13.1562 0.621657 13.5889 0.448268 14.0718C-0.281983 16.1054 0.783704 18.1491 2.9276 18.8258C5.11938 19.5175 7.25187 18.5119 8.00256 16.4214C8.14484 15.9998 8.21567 15.5793 8.21775 15.1691C8.22069 14.5309 8.24247 13.8897 8.41691 13.6489C8.51854 13.5095 8.60205 13.3518 8.6647 13.1773L8.74491 12.9515C8.92183 12.4214 9.28387 12.0469 9.98562 11.6653L10.1144 11.5975C11.3693 10.9407 13.2654 9.94755 14.0491 7.76501C14.904 5.38552 13.9137 2.2205 9.71743 0.89613C8.59584 0.542152 7.39824 0.361254 6.25328 0.372915ZM3.51645 17.1835C2.32051 16.8061 1.80448 15.7241 2.19923 14.6248C2.60944 13.4824 3.72587 12.9636 4.89884 13.3338C6.11659 13.7181 6.62575 14.7504 6.23864 15.8996C5.84416 16.9994 4.75716 17.5751 3.51645 17.1835ZM9.0801 10.1545C7.95623 10.7652 7.29824 11.4763 6.97967 12.4359C6.97967 12.4359 6.94914 12.5209 6.91139 12.626C6.87365 12.7311 6.32028 12.6511 5.6752 12.4476L5.00988 12.2376C4.3648 12.034 3.8812 11.744 3.92949 11.5902L4.01715 11.3123C4.33656 10.2116 5.11568 9.23321 6.5332 8.43233C7.55207 7.83517 8.38894 7.32238 8.63965 6.62418C8.90557 5.88365 8.5688 5.21256 7.44859 4.83545C7.07563 4.71774 6.64017 4.65101 6.20739 4.63835C5.52704 4.61868 4.99966 4.24785 5.01481 3.6094L5.02037 3.37182C5.03578 2.73386 5.59294 2.11288 6.27362 2.10626C7.10889 2.09763 8.09368 2.21217 9.12806 2.53863C12.1062 3.47855 12.9279 5.45709 12.2974 7.21297C11.7193 8.82043 10.2569 9.53642 9.0801 10.1545Z" fill="#1C4344"/>
                    </svg>
                </div>
                <div className="break"></div> 
                <h2 className="quiz--top-question">{props.question.replaceAll('&quot;','"')
                            .replaceAll('&rsquo;',"’")
                            .replaceAll("&#039;","'")
                            .replaceAll("&lrm;","")
                            .replaceAll("&ocirc;","ô")
                            .replaceAll("&Ouml;","Ö")
                            .replaceAll("&uuml;","ü")
                            .replaceAll("&shy;", '')
                            .replaceAll('&aacute;','á')
                            .replaceAll("&atilde;","ã")
                            }
                </h2>
            </div>
            <div className="choices--container">
                {props.choices.map((choice,index)=>{
                    return(
                        <div className="choice--container" key={index}>
                            <input
                                type="radio" 
                                className={!props.isActive?choice.isCorrect?'correct':'wrong':''}
                                id={`${props.id}-${index + 1}`} 
                                name={`answer-${props.id}`} 
                                value={choice.isCorrect}
                                disabled={!props.isActive}
                            />
                            <label
                                className="choice" 
                                htmlFor={`${props.id}-${index + 1}`}         
                            >
                                <h3>{index===0?'A':index===1?'B':'C'}:</h3>
                                <p>
                                    {choice.value.replaceAll('&quot;','"')
                                        .replaceAll('&rsquo;',"’")
                                        .replaceAll("&#039;","'")
                                        .replaceAll("&lrm;","")
                                        .replaceAll("&ocirc;","ô")
                                        .replaceAll("&Ouml;","Ö")
                                        .replaceAll("&uuml;","ü")
                                        .replaceAll('&aacute;','á')
                                        .replaceAll("&atilde;","ã")
                                    }
                                </p>
                            </label>
                        </div>
                    )
                    
                })}
                    <input 
                        type="radio"
                        id='default-choice'
                        name={`answer-${props.id}`} 
                        value={false}
                        defaultChecked
                    />
            </div>
        </div>
    )
}