import React, { FC } from "react";
import { Box, Divider, Text } from "@chakra-ui/react";

type CardProps = {
  title: string;
  children: any;
};

const Card: FC<CardProps> = ({ title, children }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
    >
      <Box px="6" pb="4">
        <Box display="flex" alignItems="baseline">
          <Text fontSize="xl" fontWeight="semibold" mr="2">
            {title}
          </Text>
        </Box>
        <Divider />
      </Box>
      <Box px={6}>{children}</Box>
    </Box>
  );
};

export default Card;
