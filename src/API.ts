/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCardsInput = {
  id?: string | null,
  category: string,
  question: string,
  answer: string,
};

export type ModelCardsConditionInput = {
  category?: ModelStringInput | null,
  question?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  and?: Array< ModelCardsConditionInput | null > | null,
  or?: Array< ModelCardsConditionInput | null > | null,
  not?: ModelCardsConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateCardsInput = {
  id: string,
  category?: string | null,
  question?: string | null,
  answer?: string | null,
};

export type DeleteCardsInput = {
  id?: string | null,
};

export type ModelCardsFilterInput = {
  id?: ModelIDInput | null,
  category?: ModelStringInput | null,
  question?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  and?: Array< ModelCardsFilterInput | null > | null,
  or?: Array< ModelCardsFilterInput | null > | null,
  not?: ModelCardsFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateCardsMutationVariables = {
  input: CreateCardsInput,
  condition?: ModelCardsConditionInput | null,
};

export type CreateCardsMutation = {
  createCards:  {
    __typename: "Cards",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCardsMutationVariables = {
  input: UpdateCardsInput,
  condition?: ModelCardsConditionInput | null,
};

export type UpdateCardsMutation = {
  updateCards:  {
    __typename: "Cards",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCardsMutationVariables = {
  input: DeleteCardsInput,
  condition?: ModelCardsConditionInput | null,
};

export type DeleteCardsMutation = {
  deleteCards:  {
    __typename: "Cards",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCardsQueryVariables = {
  id: string,
};

export type GetCardsQuery = {
  getCards:  {
    __typename: "Cards",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCardssQueryVariables = {
  filter?: ModelCardsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCardssQuery = {
  listCardss:  {
    __typename: "ModelCardsConnection",
    items:  Array< {
      __typename: "Cards",
      id: string,
      category: string,
      question: string,
      answer: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateCardsSubscription = {
  onCreateCards:  {
    __typename: "Cards",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCardsSubscription = {
  onUpdateCards:  {
    __typename: "Cards",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCardsSubscription = {
  onDeleteCards:  {
    __typename: "Cards",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
