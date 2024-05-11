import styled from "styled-components";
import { Colors } from "@utils/Helpers";
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export const CheckboxContainer = styled.span`
   display: flex;
   align-items: center;
   gap: 8px;
   text-transform: capitalize;
   font-weight: 400;
   font-size: smaller;
   padding: .5rem;
`

export const CheckboxRoot = styled(CheckboxPrimitive.Root)`
  background-color: #212121;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Colors.gray600};

  &:active {
   outline:none;
   border: 1px solid ${Colors.gray600};
  }

  &:focus {
   outline: none;
   border: 1px solid ${Colors.gray100};
  }

  &:hover {
   border-color: ${Colors.orange100};
  }
`

export const CheckIndicator = styled(CheckboxPrimitive.Indicator)`
   color: ${ Colors.orange500 }
`