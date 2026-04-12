import { PrismaClient } from '../src/generated/prisma/client.js'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({ url: 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Clear existing data
  await prisma.report.deleteMany()
  await prisma.bar.deleteMany()
  await prisma.user.deleteMany()
  await prisma.partner.deleteMany()

  // Seed bars
  const barsData = [
    {
      name: "Le Vieux Murier",
      address: "12 Place Plumereau",
      city: "Tours",
      type: "Bar",
      erpType: "Type N",
      erpCategory: "5e catégorie",
      capacity: 40,
      score: 82,
      lat: 47.3953,
      lng: 0.6831,
      isOpen: true,
      distance: "320m",
      lastInspection: "14 juin 2025",
      nextInspection: "juin 2026",
      certifications: JSON.stringify(["Extincteurs", "Issues secours"]),
      details: JSON.stringify([
        {label:"Extincteurs",value:"Conformes",status:"green"},
        {label:"Issues secours",value:"Conformes",status:"green"},
        {label:"Détecteurs fumée",value:"Partiel",status:"orange"},
        {label:"Éclairage sécu.",value:"Conforme",status:"green"},
        {label:"Affichages",value:"Conformes",status:"green"},
        {label:"Dernière visite",value:"juin 2025",status:"neutral"},
      ])
    },
    {
      name: "Bar du Centre",
      address: "5 Rue Colbert",
      city: "Tours",
      type: "Bar brasserie",
      erpType: "Type N",
      erpCategory: "3e catégorie",
      capacity: 80,
      score: 78,
      lat: 47.3935,
      lng: 0.6862,
      isOpen: true,
      distance: "150m",
      lastInspection: "3 mars 2025",
      nextInspection: "mars 2026",
      certifications: JSON.stringify(["Extincteurs"]),
      details: JSON.stringify([
        {label:"Extincteurs",value:"Conformes",status:"green"},
        {label:"Issues secours",value:"Action req.",status:"orange"},
        {label:"Détecteurs fumée",value:"Urgent",status:"red"},
        {label:"Éclairage sécu.",value:"Partiel",status:"orange"},
        {label:"Affichages",value:"Conformes",status:"green"},
        {label:"Dernière visite",value:"mars 2025",status:"neutral"},
      ])
    },
    {
      name: "La Guinguette",
      address: "8 Quai du Portillon",
      city: "Tours",
      type: "Bar concert",
      erpType: "Type L",
      erpCategory: "2e catégorie",
      capacity: 120,
      score: 85,
      lat: 47.3928,
      lng: 0.6820,
      isOpen: true,
      distance: "480m",
      lastInspection: "22 sept. 2025",
      nextInspection: "sept. 2026",
      certifications: JSON.stringify(["Extincteurs", "Issues secours", "Détecteurs"]),
      details: JSON.stringify([
        {label:"Extincteurs",value:"Conformes",status:"green"},
        {label:"Issues secours",value:"Conformes",status:"green"},
        {label:"Détecteurs fumée",value:"Conformes",status:"green"},
        {label:"Éclairage sécu.",value:"Conforme",status:"green"},
        {label:"Affichages",value:"Conformes",status:"green"},
        {label:"Dernière visite",value:"sept. 2025",status:"neutral"},
      ])
    },
    {
      name: "Le Marais Social Club",
      address: "18 Rue de Bretagne, Paris 3e",
      city: "Paris",
      type: "Bar cocktails",
      erpType: "Type N",
      erpCategory: "5e catégorie",
      capacity: 60,
      score: 91,
      lat: 48.8627,
      lng: 2.3597,
      isOpen: true,
      distance: "Paris 3e",
      lastInspection: "8 nov. 2025",
      nextInspection: "nov. 2026",
      certifications: JSON.stringify(["Extincteurs", "Issues secours", "Détecteurs"]),
      details: JSON.stringify([
        {label:"Extincteurs",value:"Conformes",status:"green"},
        {label:"Issues secours",value:"Conformes",status:"green"},
        {label:"Détecteurs fumée",value:"Conformes",status:"green"},
        {label:"Éclairage sécu.",value:"Conforme",status:"green"},
        {label:"Affichages",value:"Conformes",status:"green"},
        {label:"Dernière visite",value:"nov. 2025",status:"neutral"},
      ])
    },
    {
      name: "Café Oberkampf",
      address: "3 Rue Oberkampf, Paris 11e",
      city: "Paris",
      type: "Bar concert",
      erpType: "Type L",
      erpCategory: "3e catégorie",
      capacity: 150,
      score: 74,
      lat: 48.8651,
      lng: 2.3748,
      isOpen: true,
      distance: "Paris 11e",
      lastInspection: "5 oct. 2025",
      nextInspection: "oct. 2026",
      certifications: JSON.stringify(["Extincteurs"]),
      details: JSON.stringify([
        {label:"Extincteurs",value:"Conformes",status:"green"},
        {label:"Issues secours",value:"Action req.",status:"orange"},
        {label:"Détecteurs fumée",value:"Conformes",status:"green"},
        {label:"Éclairage sécu.",value:"Conforme",status:"green"},
        {label:"Registre sécu.",value:"Incomplet",status:"orange"},
        {label:"Dernière visite",value:"oct. 2025",status:"neutral"},
      ])
    },
    {
      name: "Bar République",
      address: "42 Bd du Temple, Paris 3e",
      city: "Paris",
      type: "Brasserie",
      erpType: "Type N",
      erpCategory: "2e catégorie",
      capacity: 200,
      score: 88,
      lat: 48.8641,
      lng: 2.3623,
      isOpen: true,
      distance: "Paris 3e",
      lastInspection: "15 janv. 2026",
      nextInspection: "janv. 2027",
      certifications: JSON.stringify(["Extincteurs", "Issues secours", "Éclairage"]),
      details: JSON.stringify([
        {label:"Extincteurs",value:"Conformes",status:"green"},
        {label:"Issues secours",value:"Conformes",status:"green"},
        {label:"Détecteurs fumée",value:"Conformes",status:"green"},
        {label:"Éclairage sécu.",value:"Conforme",status:"green"},
        {label:"Affichages",value:"Conformes",status:"green"},
        {label:"Dernière visite",value:"janv. 2026",status:"neutral"},
      ])
    },
    {
      name: "La Scène Bastille",
      address: "7 Rue de la Roquette, Paris 11e",
      city: "Paris",
      type: "Bar PMU",
      erpType: "Type N",
      erpCategory: "5e catégorie",
      capacity: 90,
      score: 71,
      lat: 48.8535,
      lng: 2.3710,
      isOpen: false,
      distance: "Paris 11e",
      lastInspection: "2 déc. 2025",
      nextInspection: "déc. 2026",
      certifications: JSON.stringify(["Extincteurs"]),
      details: JSON.stringify([
        {label:"Extincteurs",value:"Conformes",status:"green"},
        {label:"Issues secours",value:"Conformes",status:"green"},
        {label:"Détecteurs fumée",value:"Partiel",status:"orange"},
        {label:"Éclairage sécu.",value:"Action req.",status:"orange"},
        {label:"Affichages",value:"Conformes",status:"green"},
        {label:"Dernière visite",value:"déc. 2025",status:"neutral"},
      ])
    }
  ]

  for (const bar of barsData) {
    await prisma.bar.create({ data: bar })
  }

  // Seed partners
  const partnersData = [
    {
      name: "UMIH — Union des Métiers",
      type: "Fédération professionnelle CHR",
      logo: "shield",
      logoColor: "#1A1A3A",
      badges: JSON.stringify([{cls:"pb-agree",label:"Partenaire officiel"},{cls:"pb-local",label:"30 000 gérants"},{cls:"pb-certif",label:"CHR France"}]),
      tags: JSON.stringify(["fédération", "erp"]),
      rating: 4.9,
      reviews: 312,
      delay: "Contact immédiat",
      price: "Partenaire officiel",
      city: "Tours (37) & France",
      phone: "umih.fr",
      services: JSON.stringify(["Réseau 30 000 gérants", "Accompagnement réglementaire", "Événements CHR", "Veille législative"]),
      description: "Premier partenaire Spotysafe. L'UMIH référence Spotysafe auprès de ses 30 000 adhérents."
    },
    {
      name: "Apave Centre-Val de Loire",
      type: "Bureau de contrôle agréé",
      logo: "building",
      logoColor: "#1A3A6A",
      badges: JSON.stringify([{cls:"pb-agree",label:"Agréé Préfecture"},{cls:"pb-local",label:"Tours"},{cls:"pb-certif",label:"ERP certifié"}]),
      tags: JSON.stringify(["bureau", "erp"]),
      rating: 4.8,
      reviews: 124,
      delay: "Sous 5 jours",
      price: "À partir de 380€",
      city: "Tours (37)",
      phone: "02 47 XX XX XX",
      services: JSON.stringify(["Visite de sécurité ERP", "Rapport commission", "Suivi annuel", "Certification incendie"]),
      description: "Bureau de contrôle référence en région Centre."
    },
    {
      name: "Bureau Veritas Centre",
      type: "Bureau de contrôle & certification",
      logo: "check",
      logoColor: "#1A2A3A",
      badges: JSON.stringify([{cls:"pb-agree",label:"Agréé Préfecture"},{cls:"pb-certif",label:"ERP certifié"}]),
      tags: JSON.stringify(["bureau", "erp", "securite"]),
      rating: 4.9,
      reviews: 201,
      delay: "Sous 10 jours",
      price: "À partir de 450€",
      city: "Orléans (45)",
      phone: "02 38 XX XX XX",
      services: JSON.stringify(["Contrôle réglementaire ERP", "Commission de sécurité", "Audit complet", "Rapport officiel"]),
      description: "Leader mondial du contrôle."
    }
  ]

  for (const partner of partnersData) {
    await prisma.partner.create({ data: partner })
  }

  // Seed demo user
  await prisma.user.create({
    data: {
      name: "Utilisateur Demo",
      email: "demo@spotysafe.fr",
      role: "client",
      favorites: JSON.stringify([]),
      watchlist: JSON.stringify([]),
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
