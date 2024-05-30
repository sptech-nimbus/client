import { Dialog } from "@components/Dialog/Dialog";
import Button from "@components/Button/Button";

export function InjuryDialog() {
   return (
      <Dialog
      title='Adicionar nova lesão' 
      trigger={<Button.Primary value='+ Adicionar lesão' marginTop="0px" fontSize="1.2rem" width="100%"/>}
      >
         <span>dasd</span>
      </Dialog>
   )
}