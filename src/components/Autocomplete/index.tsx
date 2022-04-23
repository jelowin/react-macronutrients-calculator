import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Input,
  List,
  ListItem,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useDebounce } from "../../hooks/index.js";

import "./index.css";

const URL = `${
  import.meta.env.VITE_API_BASE_URL
}/food/ingredients/autocomplete?apiKey=${
  import.meta.env.VITE_SPOONACULAR_API_KEY
}`;

export default function Autocomplete() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState(null);
  const [openSuggestedList, setOpenSuggestedList] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const debounceValue = useDebounce(query);

  const getSuggestions = async () => {
    const response = await fetch(`${URL}&query=${query}`);
    const data = await response.json();

    if (data) setItems(data);
  };

  useEffect(() => {
    debounceValue && getSuggestions();
  }, [debounceValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event?.currentTarget?.value);
  };

  const handleInputClick = () => {
    setOpenSuggestedList(true);
  };

  const handleListItemClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItems((prevSelectedItems) => [
      ...prevSelectedItems,
      event?.target?.innerText,
    ]);
  };

  const handleRemoveTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    const itemToRemove: string = event?.currentTarget?.dataset?.id;
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item !== itemToRemove)
    );
  };

  console.log({ selectedItems });
  return (
    <>
      <Box mb={4}>
        <HStack spacing={4}>
          {selectedItems.length &&
            selectedItems.map((selectedItem) => (
              <Tag key={selectedItem} size="lg" borderRadius="full">
                <TagLabel>{selectedItem}</TagLabel>
                <TagCloseButton
                  data-id={selectedItem}
                  onClick={handleRemoveTag}
                />
              </Tag>
            ))}
        </HStack>
      </Box>
      <Input
        onClick={handleInputClick}
        onChange={handleInputChange}
        size="lg"
      />
      {openSuggestedList && (
        <List>
          <Stack align="stretch" spacing={6}>
            {items?.length &&
              items?.map(({ name }) => (
                <ListItem
                  className="ListItem"
                  onClick={handleListItemClick}
                  key={name}
                >
                  {name}
                </ListItem>
              ))}
          </Stack>
        </List>
      )}
    </>
  );
}
