import { NextResponse } from "next/server";
import errorHandler from errorHandler
import getTokenHandler from TokenHandler
import ValidatePutBookPayload from bookValidator
import {getBooks, addBook} from bookService

export async function GET(request) {
    try {
        const userId = getTokenHandler(request);
        const books = await getBooks(userId)
      return NextResponse.json({
        status: 'success',
        data: {
          books
        }
      }, {
        status: 200
      })
    } catch (error){
      const {data, status} = errorHandler(error);
      return NextResponse.json({
        data
      }, {
        status
      })
    }
}