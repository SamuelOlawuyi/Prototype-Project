export default function Button(props: ButtonProps){

  const colorMapping: {[key: string]: string} = {
    green: '#34A853',
    white: '#FFFFFF',
    black: '#101828',
    grey: '#F2F4F7'
  }

  const buttonStyle = {
    background: colorMapping[props.backgroundColor] || props.backgroundColor,
    color: colorMapping[props.color] || props.color,
    width: props.width,
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  }

  return (
    <button className={props.className} style={buttonStyle}>
      {props.text}
    </button>
  )
}

interface ButtonProps {
  text: string;
  backgroundColor: string;
  color: string;
  width: string;
  className?: string;
}