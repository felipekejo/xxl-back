import { prisma } from "@/lib/prisma";
import { Prisma, Role } from "@prisma/client";
import { UsersRepository } from "../users-repository";

/**
 * Implements the UsersRepository interface using Prisma.
 */
export class PrismaUsersRepository implements UsersRepository {
  /**
   * Deletes a user by their ID.
   *
   * @param {string} id - The ID of the user to delete.
   */
  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Retrieves multiple users with pagination.
   *
   * @param {number} page - The page number.
   * @returns {Promise<any[]>} - A list of users.
   */
  async findMany(page: number) {
    const users = await prisma.user.findMany({
      skip: (page - 1) * 20,
      take: 20,
    });

    return users;
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<any>} - The user object.
   */
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  /**
   * Retrieves a user by their email.
   *
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<any>} - The user object.
   */
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  /**
   * Creates a new user.
   *
   * @param {Prisma.UserCreateInput} data - The user's data.
   * @returns {Promise<any>} - The created user object.
   */
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  /**
   * Updates the password of a user.
   *
   * @param {string} id - The ID of the user to update.
   * @param {string} newPassword - The new password.
   */
  async updatePassword(id: string, newPassword: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password_hash: newPassword,
      },
    });
  }

  /**
   * Grants admin rights to a user.
   *
   * @param {string} id - The ID of the user to grant admin rights to.
   */
  async grantAdminRights(id: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: Role.ADMIN,
      },
    });
  }

  /**
   * Removes admin rights from a user.
   *
   * @param {string} id - The ID of the user to remove admin rights from.
   */
  async removeAdminRights(id: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: Role.CUSTOMER,
      },
    });
  }

  /**
   * Updates the password and clears the reset key for a user.
   *
   * @param {string} email - The email of the user to update.
   * @param {string} newPassword - The new password.
   */
  async resetPassword(email: string, newPassword: string) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password_hash: newPassword,
        reset_key: null,
        key_date: null,
      },
    });
  }

  /**
   * Generates and saves a reset key for the user.
   *
   * @param {string} id - The ID of the user to generate a reset key for.
   * @param {string} resetKey - The reset key.
   * @param {Date} keyDate - The date when the key was generated.
   */
  async generateResetPwKey(id: string, resetKey: string, keyDate: Date) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        reset_key: resetKey,
        key_date: keyDate,
      },
    });
  }

  /**
   * Retrieves a user's email by their ID.
   *
   * @param {string} id - The ID of the user.
   * @returns {Promise<string | undefined>} - The user's email or undefined if not found.
   */
  async getUserEmailById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user?.email;
  }
}
