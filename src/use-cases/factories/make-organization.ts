import { OrganizationRepository } from "@/repositories/organization-repository";

export async function makeOrganization(
  organizationRepository: OrganizationRepository
) {
  const organization = await organizationRepository.create({
    createdAt: new Date(),
    name: "org-1",
    ownerId: "user-1",
    slug: "org-1",
  });

  return organization;
}
