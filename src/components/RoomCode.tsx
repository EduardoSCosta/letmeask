import copyImg from '../assets/images/copy.svg';
import { useTheme } from '../hooks/useTheme';
import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const { theme } = useTheme();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className={`room-code ${theme}`} onClick={copyRoomCodeToClipboard}>
      <div className={theme}>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span className={theme}>Sala #{props.code}</span>
    </button>
  );
}