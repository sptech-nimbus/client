import * as S from "./ToggleGroup.styled";

function ToggleGroupRoot({children, type}) {
   return(
      <S.Root type={type}>
         {children}
      </S.Root>
   )
}

function ToggleGroupItem({children}) {
   return(
      <S.Item>
         {children}
      </S.Item>
   )
}

const ToggleGroup = {
   Root: ToggleGroupRoot,
   Item: ToggleGroupItem
}

export default ToggleGroup;