import logo from '../assets/real-manin-logo.png'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function Logo({ size = 'medium', className = '' }: LogoProps) {
  return <img className={`team-logo team-logo--${size} ${className}`} src={logo} alt="Escudo de Real Manin FC" />
}
