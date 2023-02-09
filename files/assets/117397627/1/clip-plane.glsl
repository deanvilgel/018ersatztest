// clip plane equation `Ax + By + Cz = D`
uniform int clip_enabled;

#ifndef CLIPPLANE
#define CLIPPLANE
uniform vec4 clip_plane;
#endif

void main(void) {
    if (clip_enabled == 1) {
        // if position is bellow clip plane
        if (abs(dot(vec4(vPositionW, 1.0), clip_plane)) > 100.0)
            // do not render fragment
            discard;
    }
    
    dDiffuseLight = vec3(0);
    dSpecularLight = vec3(0);
    dReflection = vec4(0);
    dSpecularity = vec3(0);
