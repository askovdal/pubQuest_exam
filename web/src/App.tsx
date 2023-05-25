import './dawa-autocomplete.css';

import {
  Button,
  chakra,
  ChakraProvider,
  extendTheme,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import axios from 'axios';
import { dawaAutocomplete } from 'dawa-autocomplete2';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ReactComponent as LogoSvg } from './logo.svg';

interface InputFields {
  start: string;
  bars: number;
}

interface GetRoute {
  html: string;
  travel: number;
  total: number;
}

export const App = () => {
  const theme = extendTheme(withDefaultColorScheme({ colorScheme: 'blue' }));

  const startRef = useRef<HTMLInputElement | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
  } = useForm<InputFields>({ shouldFocusError: false });

  const [iframeDoc, setIframeDoc] = useState<string>();
  const [timeSpent, setTimeSpent] = useState(35);
  const [transportation, setTransportation] = useState<string>('walk');
  const [addressSelected, setAddressSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [times, setTimes] = useState<Pick<GetRoute, 'total' | 'travel'>>({
    total: 0,
    travel: 0,
  });

  useEffect(() => {
    dawaAutocomplete(startRef.current, {
      adgangsadresserOnly: true,
      minLength: 1,
      select: () => {
        setAddressSelected(true);
        clearErrors('start');
      },
    });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await axios
      .get<GetRoute>('/api/route', {
        params: { ...data, timeSpent, transportation },
      })
      .then(({ data: { html, total, travel } }) => {
        setIframeDoc(html);
        setTimes({ total, travel });
      }, console.error);

    setLoading(false);
  });

  const { ref: startRefCallback, ...startRegisterRest } = register('start', {
    required: true,
    validate: () => addressSelected || 'Pick a start address from the list',
  });

  // TODO: Use tss-react

  const minBars = 2;
  const maxBars = 10;

  return (
    <ChakraProvider theme={theme}>
      <chakra.header p={2} borderBottom="1px" borderColor="gray.200">
        <chakra.div w="fit-content" m="auto">
          <LogoSvg height="100%" width="230px" />
        </chakra.div>
      </chakra.header>

      <chakra.main p={6} m="auto" maxW="800px">
        <chakra.form onSubmit={onSubmit}>
          <chakra.div display="flex" flexWrap="wrap" gap={5}>
            <FormControl isInvalid={!!errors.start} maxW="350px">
              <FormLabel>Start address</FormLabel>
              <Input
                {...startRegisterRest}
                ref={(e) => {
                  startRefCallback(e);
                  startRef.current = e;
                }}
                onChange={() => setAddressSelected(false)}
              />
              <FormErrorMessage>
                {errors.start?.message || 'Choose a start address'}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.bars} maxW="350px">
              <FormLabel>Number of bars</FormLabel>
              <NumberInput min={minBars} max={maxBars}>
                <NumberInputField
                  {...register('bars', {
                    required: true,
                    setValueAs: (value) =>
                      Math.min(Math.max(Number(value), minBars), maxBars),
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>Choose a number of bars</FormErrorMessage>
            </FormControl>

            <FormControl maxW="350px">
              <FormLabel>Time spent at each bar</FormLabel>
              <Slider
                min={10}
                max={60}
                defaultValue={timeSpent}
                onChange={setTimeSpent}
                width="95%"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb
                  fontSize="xs"
                  boxSize="45px"
                  children={`${timeSpent} min`}
                />
              </Slider>
              <FormErrorMessage>
                Write the time spent at each bear
              </FormErrorMessage>
            </FormControl>

            <div>
              <FormLabel>Mode of transportation</FormLabel>
              <RadioGroup onChange={setTransportation} value={transportation}>
                <Stack>
                  <Radio value="walk">Walking</Radio>
                  <Radio value="bike">Biking</Radio>
                </Stack>
              </RadioGroup>
            </div>
          </chakra.div>

          <Button type="submit" isLoading={loading} mt={4}>
            Calculate route
          </Button>
        </chakra.form>

        {!!iframeDoc && (
          <Flex justify="center" direction="column" mt={12}>
            <Heading size="md">Travel time: {formatTime(times.travel)}</Heading>
            <Heading size="md" mb={2}>Total time: {formatTime(times.total)}</Heading>
            <chakra.iframe
              title="Calculated route"
              srcDoc={iframeDoc}
              height="800px"
              w="100%"
              maxW="800px"
            />
          </Flex>
        )}
      </chakra.main>
    </ChakraProvider>
  );
};

const formatTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let formattedTime = `${minutes.toFixed(0)} minutes`;
  if (hours) {
    formattedTime = `${hours.toFixed(0)} hours ${formattedTime}`;
  }

  return formattedTime;
};
