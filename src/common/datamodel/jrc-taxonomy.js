/*
 * CYBERSECURITY DOMAINS
 */
const cybersecurity = {
    tag: 'cybersecurity',
    name: 'Cybersecurity domains',
    description: '',
    terms: [
        {
            tag: 'assuranceAuditCertification',
            name: 'Assurance, Audit, and Certification',
            description: '',
        },
        {
            tag: 'cryptology',
            name: 'Cryptology (Cryptography and Cryptanalysis)',
            description: '',
        },
        {
            tag: 'dataSecurityPrivacy',
            name: 'Data Security and Privacy',
            description: '',
        },
        {
            tag: 'educationTraining',
            name: 'Education and Training',
            description: '',
        },
        {
            tag: 'humanAspects',
            name: 'Human Aspects',
            description: '',
        },
        {
            tag: 'identityManagement',
            name: 'Identity Management',
            description: '',
        },
        {
            tag: 'incidentHandling',
            name: 'Incident Handling and Digital Forensics',
            description: '',
        },
        {
            tag: 'legalAspects',
            name: 'Legal Aspects',
            description: '',
        },
        {
            tag: 'networkDistributedSystems',
            name: 'Network and Distributed Systems',
            description: '',
        },
        {
            tag: 'securityManagementGovernance',
            name: 'Security Management and Governance',
            description: '',
        },
        {
            tag: 'securityMeasurements',
            name: 'Security Measurements',
            description: '',
        },
        {
            tag: 'securityEngineering',
            name: 'Software and Hardware Security Engineering',
            description: '',
        },
        {
            tag: 'steganography',
            name: 'Steganography, Steganalysis and Watermarking',
            description: '',
        },
        {
            tag: 'theoreticalFoundations',
            name: 'Theoretical Foundations',
            description: '',
        },
        {
            tag: 'trustManagement',
            name: 'Trust Management and Accountability',
            description: '',
        },
    ],
}

/*
 * SECTORS
 */
const sectors = {
    tag: 'sectors',
    name: 'Sectors',
    description: '',
    terms: [
        {
            tag: 'avMedia',
            name: 'Audiovisual and media',
            description: '',
        },
        {
            tag: 'chemical',
            name: 'Chemical',
            description: '',
        },
        {
            tag: 'defense',
            name: 'Defense',
            description: '',
        },
        {
            tag: 'digital',
            name: 'Digital Services and Platforms',
            description: '',
        },
        {
            tag: 'energy',
            name: 'Energy',
            description: '',
        },
        {
            tag: 'financial',
            name: 'Financial',
            description: '',
        },
        {
            tag: 'foodDrink',
            name: 'Food and Drink',
            description: '',
        },
        {
            tag: 'government',
            name: 'Government',
            description: '',
        },
        {
            tag: 'health',
            name: 'Health',
            description: '',
        },
        {
            tag: 'manufacturing',
            name: 'Manufacturing and Supply Chains',
            description: '',
        },
        {
            tag: 'nuclear',
            name: 'Nuclear',
            description: '',
        },
        {
            tag: 'safety',
            name: 'Safety and Security',
            description: '',
        },
        {
            tag: 'space',
            name: 'Space',
            description: '',
        },
        {
            tag: 'telecoms',
            name: 'Telecomm Infrastructure',
            description: '',
        },
        {
            tag: 'transportation',
            name: 'Transportation',
            description: '',
        },
    ],
}

/*
 * TECHNOLOGY & USE CASES
 */
const technology = {
    tag: 'technology',
    name: 'Technology & Use Cases',
    description: '',
    terms: [
        {
            tag: 'ai',
            name: 'Artificial Intelligence',
            description: '',
        },
        {
            tag: 'bigData',
            name: 'Big Data',
            description: '',
        },
        {
            tag: 'blockchain',
            name: 'Blockchain and Distributed Ledger Technology (DLT)',
            description: '',
        },
        {
            tag: 'cloud',
            name: 'Cloud, Edge and Virtualisation',
            description: '',
        },
        {
            tag: 'cip',
            name: 'Critical Infrastructure Protection (CIP)',
            description: '',
        },
        {
            tag: 'publicSpaces',
            name: 'Protection of public spaces',
            description: '',
        },
        {
            tag: 'disasterResilience',
            name: 'Disaster resilience and crisis management',
            description: '',
        },
        {
            tag: 'crimeTerrorism',
            name: 'Fight against crime and terrorism',
            description: '',
        },
        {
            tag: 'borders',
            name: 'Border and external security',
            description: '',
        },
        {
            tag: 'surveillance',
            name: 'Local/wide area observation and surveillance',
            description: '',
        },
        {
            tag: 'hardware',
            name: 'Hardware technology (RFID, chips, sensors, networking, etc.)',
            description: '',
        },
        {
            tag: 'hpc',
            name: 'High-performance computing (HPC)',
            description: '',
        },
        {
            tag: 'hmi',
            name: 'Human Machine Interface (HMI)',
            description: '',
        },
        {
            tag: 'iiot',
            name:
                'Industrial IoT and Control Systems (e.g. SCADA and Cyber Physical Systems – CPS)',
            description: '',
        },
        {
            tag: 'is',
            name: 'Information Systems',
            description: '',
        },
        {
            tag: 'iot',
            name: 'Internet of Things, embedded systems, pervasive systems',
            description: '',
        },
        {
            tag: 'mobile',
            name: 'Mobile Devices',
            description: '',
        },
        {
            tag: 'os',
            name: 'Operating Systems',
            description: '',
        },
        {
            tag: 'quantum',
            name: 'Quantum Technologies (e.g. computing and communication)',
            description: '',
        },
        {
            tag: 'robotics',
            name: 'Robotics',
            description: '',
        },
        {
            tag: 'satellites',
            name: 'Satellite systems and applications',
            description: '',
        },
        {
            tag: 'vs',
            name: 'Vehicular Systems (e.g. autonomous vehicles)',
            description: '',
        },
        {
            tag: 'uav',
            name: 'UAV (unmanned aerial vehicles)',
            description: '',
        },
    ],
}

/*
 * JRC TAXONOMY
 */
const jrcTaxonomy = {
    tag: 'jrcTaxonomy',
    name: 'EC JRC Cybersecurity Taxonomy',
    description: '',
    cybersecurity,
    sectors,
    technology,
}

//
// FUNCTIONS
//

//
// Get all tags (for verification)
//
const getAllTags = () => {
    let result = []

    result = result.concat(getTags(cybersecurity))
    result = result.concat(getTags(sectors))
    result = result.concat(getTags(technology))

    return result
}

const getTagsR = (node) => {
    let tags = []

    tags.push(node.tag)
    if (node.terms && node.terms.length > 0) {
        node.terms.forEach((n) => {
            tags = tags.concat(getTagsR(n))
        })
    }

    return tags
}

const getTags = (node) => {
    let tags = []

    tags.push(node.tag)
    if (node.terms && node.terms.length > 0) {
        node.terms.forEach((n) => {
            tags = tags.concat(n.tag)
        })
    }

    return tags
}

const getName = (tag) => {
    // check cybersecyrity
    if (cybersecurity.tag === tag) return cybersecurity.name
    for (let i = 0; i < cybersecurity.terms.length; i++) {
        const term = cybersecurity.terms[i]
        if (term.tag === tag) return term.name
    }
    // check sectors
    if (sectors.tag === tag) return sectors.name
    for (let i = 0; i < sectors.terms.length; i++) {
        const term = sectors.terms[i]
        if (term.tag === tag) return term.name
    }
    // check technology
    if (technology.tag === tag) return technology.name
    for (let i = 0; i < technology.terms.length; i++) {
        const term = technology.terms[i]
        if (term.tag === tag) return term.name
    }
}

module.exports = { jrcTaxonomy, getAllTags, getTagsR, getTags, getName }
