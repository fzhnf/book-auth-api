import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import InvariantError from "@/errors/InvariantError";
import AuthenticationError from "@/errors/AuthenticationError";
import NotFoundError from "@/errors/NotFoundError";

import prisma from "../libs/prismadb";



const _verifyNewUsername = async (username) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (user) {
    throw new InvariantError("Username sudah digunakan");
  }
}

export const addUser = async ({ username, email, password }) => {
  await _verifyNewUsername(username);

  const id = `user-${nanoid(16)}`
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      id,
      username,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
    }
  });

  if (!user) {
    throw new InvariantError("User gagal ditambahkan");
  }

  return user.id;
}

export const verifyUserCrendential = async ({ email, password }) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AuthenticationError("Kredensial yang Anda berikan salah");
  }

  const { id, password: hashedPassword } = user;

  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    throw new AuthenticationError("Kredensial yang Anda berikan salah");
  }

  return id;
}

export const getUserProfileById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      email: true,
      photoProfile: true,
      created_at: true,
      updated_at: true,
    }
  });

  if (!user) {
    throw new NotFoundError("User tidak ditemukan");
  }

  return user;
};
