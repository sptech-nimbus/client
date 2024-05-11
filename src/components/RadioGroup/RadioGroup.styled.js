import styled from "styled-components";
import * as Radio from "@radix-ui/react-radio-group";
import { Colors } from "@utils/Helpers"

export const RadioGroupRoot = styled(Radio.Root)`
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
`

export const RadioGroupItem = styled(Radio.Item)`
   all: unset;
   background-color: ${Colors.gray800};
   width: 1.2rem;
   height: 1.2rem;
   border-radius: 50%;
   border: 1px solid ${Colors.gray500};
`

export const RadioGroupIndicator = styled(Radio.Indicator)`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100%;
   position: relative;

   &:after {
      content: "";
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background-color: ${Colors.orange500}
   }
`

export const Flex = styled.div`
   display: flex;
   align-items: center;
`

export const Label = styled.label`
   font-size: 1rem;
   padding-left: 0.5rem;
`
