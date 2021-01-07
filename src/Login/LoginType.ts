export type UserType = {
  MailAddress: string
  UserName: string
}

export type TokenType = {
  Token: string
}

export type InnerFormType = {
  handleSubmit: React.FormEvent<HTMLFormElement> | undefined
}
