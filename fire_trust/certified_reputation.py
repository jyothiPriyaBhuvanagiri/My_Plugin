def calculate_certified_reputation(certifications):
    """
    Calculate the certified reputation based on certifications.

    Args:
        certifications (list of dict): List of certifications, where each dictionary contains:
            - 'certifier_id': ID of the certifier
            - 'certified_agent_id': ID of the certified agent
            - 'certification_score': Certification score (e.g., between 0 and 1)

    Returns:
        float: Certified reputation score
    """
    total_certification_score = 0
    num_certifications = len(certifications)

    for cert in certifications:
        certification_score = cert.get('certification_score', 0)
        total_certification_score += certification_score

    # Calculate the average certification score
    if num_certifications > 0:
        certified_reputation = total_certification_score / num_certifications
    else:
        certified_reputation = 0

    return certified_reputation

# Example usage of calculate_certified_reputation function

# Define certifications
certifications = [
    {'certifier_id': 'c1', 'certified_agent_id': 'agent1', 'certification_score': 0.8},
    {'certifier_id': 'c2', 'certified_agent_id': 'agent1', 'certification_score': 0.9},
    {'certifier_id': 'c3', 'certified_agent_id': 'agent1', 'certification_score': 0.7},
    {'certifier_id': 'c1', 'certified_agent_id': 'agent2', 'certification_score': 0.6},
    {'certifier_id': 'c2', 'certified_agent_id': 'agent2', 'certification_score': 0.75},
]

# Calculate certified reputation
certified_reputation = calculate_certified_reputation(certifications)

# Print the certified reputation
print("Certified Reputation Score:", certified_reputation)
