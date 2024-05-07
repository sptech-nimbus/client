import { useState, useEffect } from 'react';

import * as S from '../Register.styled';
import * as LS from '../../Login/Login.styles';

import Label from '@components/Label/Label';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';

import { TooltipInput as Tooltip } from '@components/Tooltip/Tooltip';
import { HeightValidation, WeightValidation, PositionValidation, CategoryValidation } from '@utils/Validations';

import { useMediaQuery } from 'react-responsive';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function FormStepThreeAthlete({onSubmit}) {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [position, setPosition] = useState('');
    const [category, setCategory] = useState('');

    const [toastPosition, setToastPosition] = useState('top-right');

    const isBelow799 = useMediaQuery({ maxWidth: 799 });
    const isBelow1050 = useMediaQuery({ maxWidth: 1050 });

    useEffect(() => {
        if (isBelow1050) {
            setToastPosition('top-center');
        } else {
            setToastPosition('top-right');
        }
    }, [isBelow1050]);

    function handleWeightMaskChange(e) {
        const { value } = e.target;
        let formmatedWeight = value;

        if (value.length <= 2) {
            formmatedWeight = value.replace(/^(\d+)?$/, '$1.00kg');
        } else if (value.length == 3) {
            formmatedWeight = value.replace(/^(\d+)?$/, '$1.00kg');
            console.log("3")
        } else if (value.length == 4) {
            formmatedWeight = value.replace(/^(\d{3})(\d+)?$/, '$1.$20kg');
            console.log("4")
        } else if (value.length == 5) {
            formmatedWeight = value.replace(/^(\d{3})(\d+)?$/, '$1.$2kg');
        }

        setWeight(formmatedWeight);
    }

    function handleHeightChange(e) {
        const { value } = e.target;
        let formmatedHeight = value;

        formmatedHeight = value.replace(/^(\d{1})(\d{2})?$/, '$1.$2cm')

        setHeight(formmatedHeight);
    }

    function handlePositionChange(e) {
        const { value } = e.target;
        setPosition(value);
    }

    function handleCategoryChange(e) {
        const { value } = e.target;
        setCategory(value);
    }

    function handleSubmit(e) {
        e.preventDefault(); 

        setHeight(height.replace('cm', ''));
        setWeight(weight.replace('kg', ''));

        if (
            WeightValidation(weight.replace('kg', '')) &&
            HeightValidation(height.replace('cm', '')) &&
            PositionValidation(position) &&
            CategoryValidation(category))
        {
            console.log(weight)
            onSubmit({ weight, height, position, category });
        }
        else {
            if (!WeightValidation(weight)) toast.error('Peso inválido');
            if (!HeightValidation(height)) toast.error('Altura inválido');
            if (!PositionValidation(position)) toast.error('Posição inválida');
            if (!CategoryValidation(category)) toast.error('Categoria inválida');
            console.log(weight, height, position, category)
        }
    }

    return (
        <S.Form onSubmit={handleSubmit}>
            <ToastContainer
                position={toastPosition}
                autoClose={8000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
                limit={3}
            /> 
            <LS.InputsContainer>
                <Label>
                    Peso
                    <S.InputLine>
                        <Input.Masked
                            placeholder={'80.00kg'}
                            value={weight}
                            onBlur={handleWeightMaskChange}
                        />
                    </S.InputLine>
                </Label>
                <Label>
                    Altura
                    <S.InputLine>
                        <Input.Masked
                            placeholder={'1.90cm'}
                            value={height}
                            onBlur={handleHeightChange}
                            width='50%'
                        />
                    </S.InputLine>
                </Label>

                <LS.InputsContainer>
                    <Label>
                        Posição
                        <Input.Default
                            placeholder={'Pivo'}
                            value={position}
                            onChange={handlePositionChange}
                            width='50%'
                        />
                    </Label>
                    <Label>
                        Categoria
                        <Input.Masked
                            mask={'Sub-00'}
                            placeholder={'Sub-20'}
                            value={category}
                            onChange={handleCategoryChange}
                            width='40%'
                        />
                    </Label>
                </LS.InputsContainer>
            </LS.InputsContainer>
            <Button.Primary 
                value={'Continuar'}
                size={'md'}
                width={'100%'}
                fontSize={'1.5rem'}
                onClick={handleSubmit}
            />
        </S.Form>
    )
}