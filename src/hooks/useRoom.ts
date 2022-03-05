import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";



type Question = {
  id: string;
  author: {
    name: string,
    avatar: string,
  }
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
  likeId: string | undefined,
  likeCount: number,
}

type FirebaseQuestions = Record<string , {
  author: {
    name: string,
    avatar: string
  }
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

export function useRoom(roomId: string){
  const {user} = useAuth();
  const [ questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('')

  useEffect(() =>{
    const db =  ref(database,`rooms/${roomId}`);
    const dados = onValue(db, room => {
        const databaseRoom = room.val();
        const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
        const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
          return{
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            hasLiked: Object.values(value.likes ?? {}).some(likes => likes.authorId === user?.id),
            likeId: Object.entries(value.likes ?? {}).find(([key,like])=>like.authorId === user?.id)?.[0],
          }
        })
        setTitle(databaseRoom.title);
        setQuestions(parsedQuestions);
    })
    return ()=> {
      off(db);
    }
  },[roomId, user?.id]);
  return{questions, title}
}