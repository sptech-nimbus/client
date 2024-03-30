import * as C from './styles'

export function Label({text, children}) {
   return (
      <C.Label>
         {text}
         {children}
      </C.Label>
   )
}
