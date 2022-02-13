import './PText.css'
type Props = {
  text:string
}
export default function PText({text}:Props) {
  return <div className="ps-v-text">{text}</div>;
}
