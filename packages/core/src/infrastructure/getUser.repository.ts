import { HttpRepository } from "../shared/httpFacade";
import { Database } from "../types/supabase";
import { DomainException, InfrastructureException } from "../shared/exception";
import { User } from "../domain/user";
import { supabase } from "../shared/supabaseClient";

export class GetUserRepository implements HttpRepository<number, User | null> {
  async execute(id: number): Promise<User | null> {
    try {
      const { data: user } = await supabase
        .from("user")
        .select()
        .eq("id", id)
        .single();
      return GetUserDTO.fromJSON(user);
    } catch (error) {
      if (error instanceof DomainException) throw error;
      throw new GetUserInfrastructureException();
    }
  }
}

class GetUserInfrastructureException extends InfrastructureException { }

class GetUserDTO {
  static fromJSON(
    data: Database["public"]["Tables"]["user"]["Row"] | null
  ): User | null {
    if (data === null) return null;

    return User.create(
      data.id,
      data.username,
      data.firstname,
      data.lastname,
      data.department,
      data.image,
      data.created_at
    );
  }
}
