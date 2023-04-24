import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  Button,
  chakra,
  ChakraProvider,
  extendTheme,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  withDefaultColorScheme,
} from '@chakra-ui/react';

import { dawaAutocomplete } from 'dawa-autocomplete2';
import './App.css';
import { useForm } from 'react-hook-form';
import { ReactComponent as LogoSvg } from './logo.svg';

interface Form {
  bars: number;
  start: string;
}

export const App = () => {
  const theme = extendTheme(withDefaultColorScheme({ colorScheme: 'blue' }));

  const startRef = useRef<HTMLInputElement | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({ shouldFocusError: false });

  useEffect(() => {
    dawaAutocomplete(startRef.current);
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const { ref: startRefCallback, ...startRegisterRest } = register('start', {
    required: true,
  });

  return (
    <ChakraProvider theme={theme}>
      <chakra.header p={2} borderBottom="1px" borderColor="gray.200">
        <chakra.div w="fit-content" m="auto">
          <LogoSvg height="100%" width="230px" />
        </chakra.div>
      </chakra.header>

      <main>
        <chakra.form onSubmit={onSubmit} p={6} m="auto" maxW="800px">
          <chakra.div display="flex" gap={5}>
            <FormControl isInvalid={!!errors.bars}>
              <FormLabel>Number of bars</FormLabel>
              <NumberInput min={0} max={10}>
                <NumberInputField {...register('bars', { required: true })} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>Choose a number</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.start}>
              <FormLabel>Start address</FormLabel>
              <Input
                {...startRegisterRest}
                ref={(e) => {
                  startRefCallback(e);
                  startRef.current = e;
                }}
              />
              <FormErrorMessage>Choose a start address</FormErrorMessage>
            </FormControl>
          </chakra.div>

          {/* TODO: Walking or cycling */}
          {/* TODO: Time spent at each bar */}

          <Button type="submit" mt={4}>
            Calculate route
          </Button>
        </chakra.form>
      </main>
    </ChakraProvider>
  );
};
