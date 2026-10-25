import { User } from "@/generated/prisma/client";

type Entity = {
  userId: string | null;
};

type IsOwnerFn = (
  authUser: User | null | undefined,
  entity: Entity | null | undefined,
) => boolean;

const isOwner: IsOwnerFn = (authUser, entity) =>
  entity?.userId === authUser?.id;

export { isOwner };
