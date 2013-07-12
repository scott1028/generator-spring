package <%= basePackage %>.web.helper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JspHelper {
	
	public static String siteTitle;
	public static String shibbolethUrl;
	public static String profile;

	public static String getSiteTitle() { return siteTitle; }
	public static String getShibbolethUrl() { return shibbolethUrl; }
	public static String getProfile() { return profile; }
	
	@Value("${site.title}")
	@SuppressWarnings("static-access")
	public void setSiteTitle(String siteTitle) { this.siteTitle = siteTitle; }
	
	@Value("${shibboleth.url}")
	@SuppressWarnings("static-access")
	public void setShibbolethUrl(String shibbolethUrl) { this.shibbolethUrl = shibbolethUrl; }
	
	@SuppressWarnings("static-access")
	@Value("${spring.profiles.active}")
	public void setProfile(String profile) { this.profile = profile; }
	
	public static boolean isSpoofingEnable() {
		return profile.compareToIgnoreCase("local") == 0 ||
			   profile.compareToIgnoreCase("dev") == 0;
	}
}
