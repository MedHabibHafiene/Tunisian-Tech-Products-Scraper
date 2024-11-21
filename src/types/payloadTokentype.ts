export type payloadTokentype = {
    id : string,
    payloadForRefreshToken? : string,
    iat : number,
    exp : number
}

export type payloadRefreshTokentype = {
    id : string,
    payloadForRefreshToken? : string,
    iat : number
}