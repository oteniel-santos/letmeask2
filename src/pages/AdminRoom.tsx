// import { useState, FormEvent, useEffect } from 'react';
import{useNavigate, useParams} from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import {database, ref, onValue, push, set } from "../services/firebase"
import "../styles/room.scss"
import {useRoom} from '../hooks/useRoom';
import { remove, update } from 'firebase/database';


type RoomParams = {
  id: string;
}

export function AdminRoom(){
  // const {user} = useAuth();
  const navigate = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id;  
  const {title, questions}= useRoom(roomId!); 

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que deseja remover esta pergunta?')){
      const questionRef = ref(database,`rooms/${roomId}/questions/${questionId}`);
      await remove(questionRef);
    }
  }

  async function handleEndRoom(){
    const roomRef = ref(database, `rooms/${roomId}`);
    await update(roomRef, {
      endedAt: new Date()
    });
    
    navigate(`/`);
  }

  
  return(
    <div id="page-room">
      <header>
        <div className = "content">
          <img src={logoImg} alt="Letmeask" />
            <div>
               <RoomCode code  ={roomId!} />
               <Button isOutlined onClick={handleEndRoom} >Encerrar Sala </Button>
            </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

          <div className="question-list">
            {questions.map(question => {
              return(
                <Question
                  key = {question.id} 
                  content = {question.content}
                  author = {question.author} 
                >
                  <button
                  type="button"
                  onClick={()=> handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover Pergunta" />
                  </button>
                </Question>
              )
            })}

          </div>
      </main>
    </div>
  )
}