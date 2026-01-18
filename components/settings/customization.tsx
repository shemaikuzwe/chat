import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "@tanstack/react-form";
import { customizationSchema } from "~/lib/types/schema";
import { Field, FieldLabel } from "../ui/field";

export default function Customization() {
    const form = useForm({
        defaultValues: {
            name:undefined,
            occupation:undefined,
            bio: undefined,
            customInstructions: undefined,
        },
        validators: {
            onSubmit: customizationSchema
        },
        onSubmit: async ({ value }) => {
            console.log(value);
        }
    })
    return (
        <section className="space-y-8">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold">Customize Your Experience</h2>
                <p className="text-sm text-muted-foreground">
                    Tell us a bit about yourself to personalize your chat experience.
                </p>
            </div>

            <form 
                onSubmit={(e) => { 
                    e.preventDefault();
                    form.handleSubmit(e) 
                }} 
                className="space-y-6">
                <form.Field name="name" children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid} className="space-y-2">
                            <FieldLabel htmlFor={field.name}>
                                What should we call you?
                            </FieldLabel>
                            <div className="relative">
                                <Input
                                    id="name"
                                    placeholder="Enter your nick name"
                                    className="bg-transparent border-border pr-12 focus-visible:ring-1 focus-visible:ring-ring"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                    {field.state.value.length}/50
                                </span>
                            </div>
                        </Field>
                    )
                }}>
                        
                </form.Field>
                <form.Field name="occupation" children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid} className="space-y-2">
                            <FieldLabel htmlFor={field.name}>
                                What do you do?
                            </FieldLabel>
                            <div className="relative">
                                <Input
                                    id="occupation"
                                    placeholder="Enter your occupation"
                                    className="bg-transparent border-border pr-12 focus-visible:ring-1 focus-visible:ring-ring"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                    {field.state.value.length}/50
                                </span>
                            </div>
                        </Field>
                    )
                }}>
                        
                </form.Field>
                <form.Field name="bio" children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid} className="space-y-2">
                            <FieldLabel htmlFor={field.name}>
                                Tell us about yourself
                            </FieldLabel>
                            <div className="relative">
                                <Textarea
                                    id="bio"
                                    rows={3}
                                    placeholder="Interests, values, or preferences to keep in mind"
                                    className="bg-transparent border-border pr-12 focus-visible:ring-1 focus-visible:ring-ring"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                    {field.state.value.length}/50
                                </span>
                            </div>
                        </Field>
                    )
                }}>
                </form.Field>
                <form.Field name="customInstructions" children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                        <Field data-invalid={isInvalid} className="space-y-2">
                            <FieldLabel htmlFor={field.name}>
                                Custom Instructions
                            </FieldLabel>
                            <div className="relative">
                                <Textarea
                                    rows={3}
                                    placeholder="Don't say you are absolutely right, don't use emojis"
                                    className="bg-transparent border-border pr-12 focus-visible:ring-1 focus-visible:ring-ring"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                    {field.state.value.length}/50
                                </span>
                            </div>
                        </Field>
                    )
                }}>
                </form.Field>

                <Button>
                    Save Preferences
                </Button>
            </form>
        </section>
    )
} 