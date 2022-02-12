import './VText.css'
type Props = {
  text:string
}
export default function VText({text}:Props) {
  return <div className="ps-v-text">{text}</div>;
}
