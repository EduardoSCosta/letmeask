import { useState } from 'react';
import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

import { ThemeSwitch } from '../components/ThemeSwitch';
import { useTheme } from '../hooks/useTheme';
import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event : FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <aside className={theme}>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask"/>
          <h2 className={theme}>Criar um nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input className={theme}
                    type="text"
                    placeholder="Nome da sala"
                    onChange={event => setNewRoom(event.target.value)}
                    value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
            </p>
        </div>
      </main>
      <ThemeSwitch/>
    </div>
  )
}