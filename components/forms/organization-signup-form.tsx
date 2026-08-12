"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode
} from "react";
import { useFormState } from "react-dom";
import {
  AuthField,
  AuthSelect,
  AuthSubmitButton,
  AuthTextArea,
  PasswordField
} from "@/components/auth/auth-form-controls";
import { organizationSignupAction } from "@/lib/actions";
import { organizationTypeOptions } from "@/lib/constants";
import { emptyState, firstError } from "@/lib/forms";

type Step = 1 | 2 | 3;
type ClientErrors = Record<string, string>;
type Values = Record<string, unknown>;

const steps = [
  { number: "01", label: "Organization" },
  { number: "02", label: "Your details" },
  { number: "03", label: "Confirm" }
] as const;

export function OrganizationSignupForm() {
  const [state, formAction] = useFormState(organizationSignupAction, emptyState);
  const [step, setStep] = useState<Step>(1);
  const [furthestStep, setFurthestStep] = useState<Step>(1);
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [review, setReview] = useState({
    organization: "",
    type: "",
    representative: "",
    email: "",
    location: ""
  });
  const formRef = useRef<HTMLFormElement>(null);
  const values = state.values as Values | undefined;

  useEffect(() => {
    if (!state.errors) return;
    const keys = Object.keys(state.errors);
    const organizationFields = ["organizationName", "organizationType", "website", "description"];
    const representativeFields = [
      "contactFirstName",
      "contactLastName",
      "contactRole",
      "contactEmail",
      "password",
      "confirmPassword"
    ];
    setStep(
      keys.some((key) => organizationFields.includes(key))
        ? 1
        : keys.some((key) => representativeFields.includes(key))
          ? 2
          : 3
    );
    setFurthestStep(3);
  }, [state.errors]);

  function errorFor(name: string) {
    return clientErrors[name] || firstError(state.errors, name);
  }

  function formData() {
    return new FormData(formRef.current || undefined);
  }

  function validate(target: Step) {
    const data = formData();
    const value = (name: string) => String(data.get(name) || "").trim();
    const errors: ClientErrors = {};

    if (target === 1) {
      if (value("organizationName").length < 2) errors.organizationName = "Enter your organization name.";
      if (!value("organizationType")) errors.organizationType = "Choose an organization type.";
      if (value("website")) {
        try {
          new URL(value("website"));
        } catch {
          errors.website = "Enter a complete URL, including https://.";
        }
      }
      if (value("description").length < 20) {
        errors.description = "Use at least 20 characters to describe the organization.";
      }
    }

    if (target === 2) {
      if (!value("contactFirstName")) errors.contactFirstName = "Enter your first name.";
      if (!value("contactLastName")) errors.contactLastName = "Enter your last name.";
      if (value("contactRole").length < 2) errors.contactRole = "Enter your role or job title.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("contactEmail"))) {
        errors.contactEmail = "Enter a valid work email.";
      }
      if (passwordValue.length < 8) errors.password = "Use at least 8 characters.";
    }

    if (target === 3) {
      if (!value("city")) errors.city = "Enter your city.";
      if (!value("state")) errors.state = "Enter your state or province.";
      if (!value("country")) errors.country = "Enter your country.";
      if (!data.get("authorized")) errors.authorized = "Confirm that you are authorized.";
      if (!data.get("agreeLegal")) errors.agreeLegal = "Confirm that you have read and agreed to the Legal & Safety Center terms.";
      if (!data.get("agree")) errors.agree = "Accept the Terms of Use and Privacy Policy.";
    }

    return errors;
  }

  function focusFirstError(errors: ClientErrors) {
    const name = Object.keys(errors)[0];
    if (!name) return;
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
    });
  }

  function goTo(next: Step) {
    setStep(next);
    setFurthestStep((current) => Math.max(current, next) as Step);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  function continueFrom(current: 1 | 2) {
    const errors = validate(current);
    setClientErrors(errors);
    if (Object.keys(errors).length) {
      focusFirstError(errors);
      return;
    }
    if (current === 2) collectReview();
    goTo((current + 1) as Step);
  }

  function collectReview() {
    const data = formData();
    const option = organizationTypeOptions.find((item) => item.value === data.get("organizationType"));
    setReview({
      organization: String(data.get("organizationName") || ""),
      type: option?.label || "",
      representative: `${String(data.get("contactFirstName") || "")} ${String(data.get("contactLastName") || "")}`.trim(),
      email: String(data.get("contactEmail") || ""),
      location: [data.get("city"), data.get("state"), data.get("country")].filter(Boolean).join(", ")
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const errors = { ...validate(1), ...validate(2), ...validate(3) };
    if (!Object.keys(errors).length) return;
    event.preventDefault();
    setClientErrors(errors);
    const first = Object.keys(errors)[0];
    const nextStep: Step = ["organizationName", "organizationType", "website", "description"].includes(first)
      ? 1
      : ["contactFirstName", "contactLastName", "contactRole", "contactEmail", "password"].includes(first)
        ? 2
        : 3;
    setStep(nextStep);
    focusFirstError(errors);
  }

  return (
    <>
      <div className="student-signup-intro">
        <p>Organization registration</p>
        <h1>Create your organization account.</h1>
        <span>Tell us who you represent. We verify organizations before their first challenge is published.</span>
      </div>

      <nav className="student-signup-progress" aria-label="Registration progress">
        <ol>
          {steps.map((item, index) => {
            const itemStep = (index + 1) as Step;
            return (
              <li key={item.number} data-active={step === itemStep} data-complete={step > itemStep}>
                <button
                  type="button"
                  disabled={itemStep > furthestStep}
                  onClick={() => {
                    setClientErrors({});
                    goTo(itemStep);
                  }}
                  aria-current={step === itemStep ? "step" : undefined}
                >
                  <span>{item.number}</span>
                  {item.label}
                </button>
                <span className="student-signup-progress__track" aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      </nav>

      <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate className="student-signup-form">
        <input type="hidden" name="confirmPassword" value={passwordValue} />
        <div className="student-signup-status" aria-live="polite">
          {state.message ? <p>{state.message}</p> : null}
        </div>

        <fieldset hidden={step !== 1} className="student-signup-step">
          <legend>Organization</legend>
          <p className="student-signup-step__lead">Start with the organization students will see on each challenge brief.</p>
          <AuthField
            label="Organization name"
            name="organizationName"
            autoComplete="organization"
            defaultValue={(values?.organizationName as string) || ""}
            error={errorFor("organizationName")}
            required
          />
          <AuthSelect
            label="Organization type"
            name="organizationType"
            defaultValue={(values?.organizationType as string) || "COMPANY"}
            error={errorFor("organizationType")}
          >
            {organizationTypeOptions.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </AuthSelect>
          <AuthField
            label="Website"
            name="website"
            type="url"
            placeholder="https://example.org"
            defaultValue={(values?.website as string) || ""}
            error={errorFor("website")}
            hint="Optional. Include the full URL."
          />
          <AuthTextArea
            label="Short organization description"
            name="description"
            rows={4}
            defaultValue={(values?.description as string) || ""}
            error={errorFor("description")}
            hint="A concise description of what your organization does."
            required
          />
          <div className="student-signup-actions student-signup-actions--single">
            <button type="button" onClick={() => continueFrom(1)}>
              Continue <span aria-hidden="true">→</span>
            </button>
          </div>
        </fieldset>

        <fieldset hidden={step !== 2} className="student-signup-step">
          <legend>Your details</legend>
          <p className="student-signup-step__lead">Use the contact details of the person responsible for challenge briefs.</p>
          <div className="student-auth-field-grid">
            <AuthField
              label="First name"
              name="contactFirstName"
              autoComplete="given-name"
              defaultValue={(values?.contactFirstName as string) || ""}
              error={errorFor("contactFirstName")}
              required
            />
            <AuthField
              label="Last name"
              name="contactLastName"
              autoComplete="family-name"
              defaultValue={(values?.contactLastName as string) || ""}
              error={errorFor("contactLastName")}
              required
            />
          </div>
          <AuthField
            label="Role or job title"
            name="contactRole"
            autoComplete="organization-title"
            defaultValue={(values?.contactRole as string) || ""}
            error={errorFor("contactRole")}
            required
          />
          <AuthField
            label="Work email"
            name="contactEmail"
            type="email"
            autoComplete="email"
            defaultValue={(values?.contactEmail as string) || ""}
            error={errorFor("contactEmail")}
            required
          />
          <PasswordField
            label="Password"
            name="password"
            visible={showPassword}
            onToggle={() => setShowPassword((visible) => !visible)}
            onChange={(event) => {
              setPasswordValue(event.target.value);
              if (clientErrors.password && event.target.value.length >= 8) {
                setClientErrors((current) => ({ ...current, password: "" }));
              }
            }}
            onBlur={() => {
              if (passwordValue && passwordValue.length < 8) {
                setClientErrors((current) => ({ ...current, password: "Use at least 8 characters." }));
              }
            }}
            error={errorFor("password")}
            hint="Use at least 8 characters."
            autoComplete="new-password"
            minLength={8}
          />
          <div className="student-signup-actions">
            <button type="button" className="student-signup-actions__back" onClick={() => goTo(1)}>Back</button>
            <button type="button" onClick={() => continueFrom(2)}>Continue <span aria-hidden="true">→</span></button>
          </div>
        </fieldset>

        <fieldset hidden={step !== 3} className="student-signup-step">
          <legend>Review and confirm</legend>
          <p className="student-signup-step__lead">Confirm the account owner and the location required for your organization profile.</p>
          <div className="student-auth-field-grid">
            <AuthField
              label="City"
              name="city"
              autoComplete="address-level2"
              defaultValue={(values?.city as string) || ""}
              error={errorFor("city")}
              required
            />
            <AuthField
              label="State or province"
              name="state"
              autoComplete="address-level1"
              defaultValue={(values?.state as string) || ""}
              error={errorFor("state")}
              required
            />
          </div>
          <AuthField
            label="Country"
            name="country"
            autoComplete="country-name"
            defaultValue={(values?.country as string) || "United States"}
            error={errorFor("country")}
            required
          />
          <div className="student-signup-review">
            <ReviewGroup label="Organization" onEdit={() => goTo(1)}>
              <p>{review.organization || "Organization name"}</p>
              <span>{review.type || "Organization type"}</span>
            </ReviewGroup>
            <ReviewGroup label="Account owner" onEdit={() => goTo(2)}>
              <p>{review.representative || "Representative name"}</p>
              <span>{review.email || "Work email"}</span>
            </ReviewGroup>
          </div>
          <div className="student-legal-confirmations">
            <LegalCheckbox
              name="authorized"
              defaultChecked={Boolean(values?.authorized)}
              error={errorFor("authorized")}
              label="I confirm that I am authorized to create an account for this organization."
            />
            <LegalCheckbox
              name="agreeLegal"
              defaultChecked={Boolean(values?.agreeLegal)}
              error={errorFor("agreeLegal")}
              label={
                <>
                  I have read and agree to the{" "}
                  <a href="/legal" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", fontWeight: 600 }}>
                    Legal & Safety Center
                  </a>{" "}
                  terms and policies.
                </>
              }
            />
            <LegalCheckbox
              name="agree"
              defaultChecked={Boolean(values?.agree)}
              error={errorFor("agree")}
              label={
                <>
                  I agree to the{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>Terms of Use</a> and{" "}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>Privacy Policy</a>.
                </>
              }
            />
          </div>
          <p className="organization-verification-note">
            Organizations are verified before their first challenge can be published.
          </p>
          <div className="student-signup-actions student-signup-actions--submit">
            <button type="button" className="student-signup-actions__back" onClick={() => goTo(2)}>Back</button>
            <AuthSubmitButton pendingText="Creating account...">Create organization account</AuthSubmitButton>
          </div>
        </fieldset>
      </form>
    </>
  );
}

function LegalCheckbox({
  name,
  label,
  error,
  defaultChecked
}: {
  name: string;
  label: ReactNode;
  error?: string;
  defaultChecked?: boolean;
}) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <label className="student-legal-checkbox">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      />
      <span>
        {label}
        {error ? <em id={errorId}>{error}</em> : null}
      </span>
    </label>
  );
}

function ReviewGroup({
  label,
  onEdit,
  children
}: {
  label: string;
  onEdit: () => void;
  children: ReactNode;
}) {
  return (
    <section>
      <div>
        <h2>{label}</h2>
        <button type="button" onClick={onEdit}>Edit</button>
      </div>
      {children}
    </section>
  );
}
