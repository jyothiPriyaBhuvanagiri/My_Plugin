def add_rule(rule_database, role_a, role_b, context, expected_performance, influence_level):
    # Add a new rule to the rule database
    rule_database.append((role_a, role_b, context, expected_performance, influence_level))

def evaluate_trust(rule_database, role_a, role_b, context):
    # Evaluate trust based on matching rules
    matching_rules = [rule for rule in rule_database if rule[0] == role_a and rule[1] == role_b and rule[2] == context]
    if not matching_rules:
        return None  # No matching rules found

    # Calculate role-based trust
    trust_value = sum(rule[3] * rule[4] for rule in matching_rules) / sum(rule[4] for rule in matching_rules)
    return trust_value



# Initialize an empty rule database
rule_database = []

# Add some rules to the rule database
add_rule(rule_database, 'Employee', 'Manager', 'Project', 0.8, 0.6)
add_rule(rule_database, 'Manager', 'CEO', 'Performance Review', 0.9, 0.7)
add_rule(rule_database, 'Employee', 'Colleague', 'Teamwork', 0.7, 0.5)

# Specify roles and context for trust evaluation
role_a = 'Manager'
role_b = 'CEO'
context = 'Performance Review'

# Evaluate trust between the specified roles in the given context
trust_value = evaluate_trust(rule_database, role_a, role_b, context)

# Print the trust value
if trust_value is not None:
    print(f"Trust value between {role_a} and {role_b} in context {context}: {trust_value}")
else:
    print("No matching rules found for trust evaluation.")
